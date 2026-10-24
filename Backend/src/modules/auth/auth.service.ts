import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
import { sha256 } from "../../utils/crypto";
import type { User } from "@prisma/client";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client();
const publicUser = ({ passwordHash: _, googleSub: __, ...user }: User) => user;
const sign = async (user: Pick<User, "id" | "email" | "role">) => {
  const accessToken = jwt.sign({ email: user.email, role: user.role, type: "access" }, env.JWT_ACCESS_SECRET, { subject: user.id, expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"] });
  const refreshToken = jwt.sign({ type: "refresh" }, env.JWT_REFRESH_SECRET, { subject: user.id, expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"], jwtid: crypto.randomUUID() });
  const decoded = jwt.decode(refreshToken) as { exp: number };
  await prisma.refreshToken.create({ data: { tokenHash: sha256(refreshToken), userId: user.id, expiresAt: new Date(decoded.exp * 1000) } });
  return { accessToken, refreshToken };
};

export const authService = {
  async register(input: { email: string; password: string; firstName: string; lastName: string; phone?: string }) {
    const email = input.email.toLowerCase().trim();
    if (await prisma.user.findUnique({ where: { email } })) throw new ApiError(409, "Un compte utilise déjà cet e-mail.", "EMAIL_EXISTS");
    const { password, ...profile } = input;
    const user = await prisma.user.create({ data: { ...profile, email, passwordHash: await bcrypt.hash(password, 12) } });
    return { user: publicUser(user), ...(await sign(user)) };
  },
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user || !user.isActive || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) throw new ApiError(401, "E-mail ou mot de passe incorrect.", "INVALID_CREDENTIALS");
    return { user: publicUser(user), ...(await sign(user)) };
  },
  async google(credential: string) {
    if (!env.GOOGLE_CLIENT_ID) throw new ApiError(503, "La connexion Google n'est pas encore configurée.", "GOOGLE_AUTH_NOT_CONFIGURED");
    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: env.GOOGLE_CLIENT_ID });
      payload = ticket.getPayload();
    } catch {
      throw new ApiError(401, "La connexion Google n'a pas pu être vérifiée.", "INVALID_GOOGLE_TOKEN");
    }
    if (!payload?.sub || !payload.email || !payload.email_verified) throw new ApiError(401, "Le compte Google doit utiliser une adresse e-mail vérifiée.", "UNVERIFIED_GOOGLE_EMAIL");
    const email = payload.email.toLowerCase().trim();
    let user = await prisma.user.findFirst({ where: { OR: [{ googleSub: payload.sub }, { email }] } });
    if (user?.role === "ADMIN") throw new ApiError(403, "Utilisez la connexion administrateur pour ce compte.", "ADMIN_GOOGLE_LOGIN_FORBIDDEN");
    if (user && !user.isActive) throw new ApiError(403, "Ce compte client est actuellement bloqué.", "ACCOUNT_BLOCKED");
    if (user?.googleSub && user.googleSub !== payload.sub) throw new ApiError(409, "Cette adresse e-mail est déjà associée à un autre compte Google.", "GOOGLE_ACCOUNT_CONFLICT");
    if (user) {
      user = await prisma.user.update({ where: { id: user.id }, data: { googleSub: payload.sub } });
    } else {
      const fallbackName = payload.name?.trim().split(/\s+/) || [];
      user = await prisma.user.create({ data: {
        email,
        googleSub: payload.sub,
        passwordHash: null,
        firstName: payload.given_name?.trim() || fallbackName[0] || "Client",
        lastName: payload.family_name?.trim() || fallbackName.slice(1).join(" ") || "Google",
      } });
    }
    return { user: publicUser(user), ...(await sign(user)) };
  },
  async refresh(token: string) {
    let claims: jwt.JwtPayload;
    try { claims = jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload; } catch { throw new ApiError(401, "Jeton de renouvellement invalide.", "INVALID_REFRESH_TOKEN"); }
    if (claims.type !== "refresh" || !claims.sub) throw new ApiError(401, "Jeton de renouvellement invalide.", "INVALID_REFRESH_TOKEN");
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: sha256(token) }, include: { user: true } });
    if (!stored || stored.revokedAt || stored.expiresAt <= new Date() || !stored.user.isActive) throw new ApiError(401, "Session expirée.", "SESSION_EXPIRED");
    await prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } });
    return { user: publicUser(stored.user), ...(await sign(stored.user)) };
  },
  async logout(token: string) { await prisma.refreshToken.updateMany({ where: { tokenHash: sha256(token), revokedAt: null }, data: { revokedAt: new Date() } }); }
};
