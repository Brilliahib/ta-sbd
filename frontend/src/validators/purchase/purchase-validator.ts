import { z } from "zod";

export const purchaseSchema = z.object({
  product_id: z.string(),
  payment_proof_url: z
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
});

export type PurchaseType = z.infer<typeof purchaseSchema>;
