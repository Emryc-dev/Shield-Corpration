import { createHmac } from "node:crypto";
import { verifyHmac } from "../src/utils/crypto";
import { loginSchema, registerSchema } from "../src/modules/auth/auth.schemas";
describe("security primitives", () => {
  it("validates webhook signatures", () => {
    const payload = Buffer.from('{"id":"evt_1"}');
    const signature = createHmac("sha256", "secret").update(payload).digest("hex");
    expect(verifyHmac(payload, signature, "secret")).toBe(true);
    expect(verifyHmac(Buffer.from('{"id":"evt_2"}'), signature, "secret")).toBe(false);
  });
  it("requires strong passwords", () => {
    expect(registerSchema.safeParse({ body: { email: "client@example.com", password: "weak", firstName: "Ada", lastName: "Lovelace" } }).success).toBe(false);
    expect(registerSchema.safeParse({ body: { email: "client@example.com", password: "Secure123", firstName: "Ada", lastName: "Lovelace" } }).success).toBe(true);
  });
  it("validates login input", () => expect(loginSchema.safeParse({ body: { email: "bad", password: "" } }).success).toBe(false));
});
