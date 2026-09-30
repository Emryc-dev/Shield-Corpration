import request from "supertest";
import { createApp } from "../src/app";

describe("CORS", () => {
  const app = createApp();

  it("allows official ngrok HTTPS origins when explicitly enabled", async () => {
    const response = await request(app)
      .options("/api/auth/login")
      .set("Origin", "https://shield-payments.ngrok-free.app")
      .set("Access-Control-Request-Method", "POST");

    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe("https://shield-payments.ngrok-free.app");
  });

  it("does not allow lookalike ngrok domains", async () => {
    const response = await request(app)
      .options("/api/auth/login")
      .set("Origin", "https://ngrok-free.app.example.com")
      .set("Access-Control-Request-Method", "POST");

    expect(response.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
