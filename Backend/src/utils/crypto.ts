import { createHash, timingSafeEqual, createHmac } from "node:crypto";
export const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");
export const verifyHmac = (payload: Buffer, signature: string, secret: string) => {
  if (!signature || !secret) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const supplied = signature.replace(/^sha256=/, "");
  return supplied.length === expected.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
};
