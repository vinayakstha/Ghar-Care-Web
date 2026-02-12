"use server";

import { createService, getServices } from "@/lib/api/admin/service";
import { revalidatePath } from "next/cache";

export async function handleCreateService(formData: FormData) {
  try {
    const result = await createService(formData);
    if (result.success) {
      revalidatePath("/admin/service");
      return {
        success: true,
        message: "Service created successfully",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to create service",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create service",
    };
  }
}

export async function handleGetServices() {
  try {
    const result = await getServices();
    if (result.success) {
      return {
        success: true,
        message: "Services fetched successfully",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch services",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch services",
    };
  }
}
