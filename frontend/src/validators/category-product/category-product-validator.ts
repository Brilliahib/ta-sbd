import { z } from "zod";

export const categoryProductSchema = z.object({
  name: z.string(),
});

export type CategoryProductType = z.infer<typeof categoryProductSchema>;
