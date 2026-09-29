import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { prisma } from "../../config/prisma";
import { env } from "../../config/env";
import { ApiError } from "../../utils/api-error";
import { sha256 } from "../../utils/crypto";
import type { User } from "@prisma/client";

const publicUser = ({ passwordHash: _, ...user }: User) => user;
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
    if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) throw new ApiError(401, "E-mail ou mot de passe incorrect.", "INVALID_CREDENTIALS");
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
