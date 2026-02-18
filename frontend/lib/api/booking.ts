import { API } from "./endpoints";
import axios from "./axios";

export const createBooking = async (bookingData: any) => {
  try {
    const response = await axios.post(API.USER.BOOKING.CREATE, bookingData);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || error.message || "Create booking failed",
    );
  }
};
