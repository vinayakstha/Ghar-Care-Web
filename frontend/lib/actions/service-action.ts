"use server";

import { getService, getServices } from "../api/service";

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

export async function handleGetService(id: string) {
  try {
    const result = await getService(id);
    if (result.success) {
      return {
        success: true,
        message: "service fetched",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "failed to fetch service",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "failed to get service",
    };
  }
}
