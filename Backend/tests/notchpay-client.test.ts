import { notchPay } from "../src/modules/payments/notchpay.client";

describe("NotchPay client", () => {
  afterEach(() => jest.restoreAllMocks());

  it("initializes a hosted payment with the documented payload", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        transaction: { reference: "trx.test", status: "pending" },
        authorization_url: "https://pay.notchpay.co/test",
      }),
    } as Response);

    await notchPay.initialize({
      amount: 5000,
      currency: "XAF",
      email: "client@example.com",
      name: "Client Test",
      reference: "ORDER-1",
      description: "Commande ORDER-1",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/payments"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          amount: 5000,
          currency: "XAF",
          reference: "ORDER-1",
          description: "Commande ORDER-1",
          customer: { email: "client@example.com", name: "Client Test" },
          callback: "http://localhost:5173/store/payment/callback",
        }),
      }),
    );
  });
});
