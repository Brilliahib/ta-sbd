import { z } from "zod";

export const productSchema = z.object({
  category_id: z.string(),
  name: z.string(),
  image_url: z
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
  price: z.number(),
  description: z.string().nullable(),
  size: z.string(),
  condition: z.string(),
  brand: z.string().nullable(),
});

export type ProductType = z.infer<typeof productSchema>;
