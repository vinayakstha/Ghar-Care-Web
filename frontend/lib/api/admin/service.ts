import axios from "../axios";
import { API } from "../endpoints";

export const createService = async (serviceData: any) => {
  try {
    const response = await axios.post(API.ADMIN.SERVICE.CREATE, serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || error.message || "Create category failed",
    );
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(API.ADMIN.SERVICE.GETALL);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Fetch categories failed",
    );
  }
};
