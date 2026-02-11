import z from "zod";
import { ServiceSchema } from "../types/service.type";

export const CreateServiceDTO = ServiceSchema.pick({
  serviceName: true,
  serviceDescription: true,
  serviceImage: true,
  categoryId: true,
  price: true,
  isAvailable: true,
});

export type CreateServiceDTO = z.infer<typeof CreateServiceDTO>;

export const UpdateServiceDTO = ServiceSchema.partial();
export type UpdateServiceDTO = z.infer<typeof UpdateServiceDTO>;
