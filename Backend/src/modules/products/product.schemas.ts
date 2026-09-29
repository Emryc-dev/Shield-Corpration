import { z } from "zod";
export const productInput = z.object({
  name: z.string().min(2).max(180), slug: z.string().min(2).max(190).optional(), sku: z.string().min(2).max(80),
  brand: z.string().max(100).optional(), shortDescription: z.string().max(300).optional(), description: z.string().min(10),
  price: z.coerce.number().nonnegative(), compareAtPrice: z.coerce.number().nonnegative().nullable().optional(),
  stock: z.coerce.number().int().nonnegative(), status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  isFeatured: z.boolean().optional(), isNew: z.boolean().optional(), attributes: z.record(z.string(), z.unknown()).optional(),
  categoryId: z.string().min(1), images: z.array(z.object({ url: z.url(), publicId: z.string().optional(), alt: z.string().optional(), position: z.number().int().optional() })).max(12).optional()
});
export const createProductSchema = z.object({ body: productInput });
export const updateProductSchema = z.object({ body: productInput.partial(), params: z.object({ id: z.string().min(1) }) });
