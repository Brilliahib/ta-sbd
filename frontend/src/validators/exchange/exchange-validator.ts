import { z } from "zod";

export const exchangeSchema = z.object({
  product_id: z.string(),
  name_product: z.string(),
  image_url_product: z
    .union([
      z.string().nullable().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
              file.type,
            ),
          {
            message: "Gambar harus berformat jpeg, png, jpg, atau gif",
          },
        )
        .refine((file) => file.size <= 2048 * 1024, {
          message: "Ukuran gambar maksimal 2MB",
        }),
    ])
    .nullable(),
  brand_product: z.string().nullable(),
  size_product: z.string(),
  condition: z.string(),
});

export type ExchangeType = z.infer<typeof exchangeSchema>;
