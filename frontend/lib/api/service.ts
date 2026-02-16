import axios from "./axios";
import { API } from "./endpoints";

export const getServices = async () => {
  try {
    const response = await axios.get(API.USER.SERVICE.GETALL);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || "Fetch service failed",
    );
  }
};
