import request from "supertest";
import { createApp } from "../src/app";

describe("NotchPay webhook route", () => {
  const app = createApp();

  it("acknowledges an unsigned endpoint verification without processing an event", async () => {
    const response = await request(app)
      .post("/api/payments/webhook/notchpay")
      .set("Content-Type", "application/json")
      .send({ challenge: "verify-endpoint" });

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ verified: true, challenge: "verify-endpoint" });
  });

  it("rejects an unsigned payment event", async () => {
    const response = await request(app)
      .post("/api/payments/webhook/notchpay")
      .set("Content-Type", "application/json")
      .send({ id: "evt_unsigned", event: "payment.complete", data: { reference: "trx.test" } });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("INVALID_WEBHOOK_SIGNATURE");
  });
});
