import z from "zod";

export const ServiceSchema = z.object({
  serviceName: z.string(),
  serviceDescription: z.string(),
  serviceImage: z.string(),
  categoryId: z.string(),
  price: z.string(),
  isAvailable: z.boolean(),
});

export type ServiceType = z.infer<typeof ServiceSchema>;
