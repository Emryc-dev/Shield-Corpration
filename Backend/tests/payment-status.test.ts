import { mapPaymentStatus } from "../src/modules/payments/payment-status";
describe("NotchPay status mapping", () => {
  it.each([["complete", "SUCCESS"], ["failed", "FAILED"], ["cancelled", "CANCELLED"], ["expired", "EXPIRED"], ["created", "PENDING"]])("maps %s", (input, expected) => {
    expect(mapPaymentStatus(input)).toBe(expected);
  });
});
