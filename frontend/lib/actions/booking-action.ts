"use server";

import { createBooking } from "@/lib/api/booking";
import { revalidatePath } from "next/cache";

export async function handleCreateBooking(bookingData: any) {
  try {
    const result = await createBooking(bookingData);

    if (result.success) {
      revalidatePath("/booking");

      return {
        success: true,
        message: "Booking created successfully",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Failed to create booking",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create booking",
    };
  }
}
