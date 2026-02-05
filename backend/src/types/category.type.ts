import z from "zod";

export const CategorySchema = z.object({
  categoryName: z.string(),
  categoryImage: z.string(),
});
