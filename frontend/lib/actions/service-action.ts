"use server";

import { getServices } from "../api/service";

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
