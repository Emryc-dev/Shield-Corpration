import { prisma } from "../src/config/prisma";
import { cartService } from "../src/modules/cart/cart.service";
describe("cart stock controls", () => {
  afterEach(() => jest.restoreAllMocks());
  it("rejects an unavailable quantity", async () => {
    jest.spyOn(prisma.product, "findFirst").mockResolvedValue({ id: "p1", status: "ACTIVE", stock: 1 } as never);
    jest.spyOn(prisma.cart, "upsert").mockResolvedValue({ id: "c1" } as never);
    jest.spyOn(prisma.cartItem, "findUnique").mockResolvedValue({ quantity: 1 } as never);
    await expect(cartService.add("u1", "p1", 1)).rejects.toMatchObject({ code: "INSUFFICIENT_STOCK", status: 409 });
  });
});
