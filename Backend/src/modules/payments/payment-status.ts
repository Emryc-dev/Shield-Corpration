export type NormalizedPaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED" | "EXPIRED";
export const mapPaymentStatus = (value: string): NormalizedPaymentStatus => {
  const status = value.toLowerCase();
  if (["complete", "completed", "successful", "success", "paid"].includes(status)) return "SUCCESS";
  if (["failed", "declined"].includes(status)) return "FAILED";
  if (status === "cancelled" || status === "canceled") return "CANCELLED";
  if (status === "expired") return "EXPIRED";
  return "PENDING";
};
