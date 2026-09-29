import request from "supertest";
import { createApp } from "../src/app";

describe("purchase authentication", () => {
  const app = createApp();

  it.each([
    ["GET", "/api/cart"],
    ["POST", "/api/orders"],
    ["POST", "/api/payments"],
  ])("rejects anonymous %s %s requests", async (method, path) => {
    const response = await (request(app) as any)[method.toLowerCase()](path).send({});
    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe("UNAUTHENTICATED");
  });
});
