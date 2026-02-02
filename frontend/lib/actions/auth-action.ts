"use server";

import { registerUser, loginUser, getCurrentUser } from "../api/auth";
import { setUserData, setAuthToken } from "../cookie";

export const handleRegister = async (formData: any) => {
  try {
    const result = await registerUser(formData);
    if (result.success) {
      return {
        success: true,
        message: "registration successful",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Registration failed",
    };
  } catch (err: Error | any) {
    return {
      success: false,
      message: err.message || "Registration failed",
    };
  }
};

export const handleLogin = async (formData: any) => {
  try {
    const result = await loginUser(formData);
    if (result.success) {
      await setAuthToken(result.token);
      await setUserData(result.data);
      return {
        success: true,
        message: "Login successful",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Login failed",
    };
  } catch (err: Error | any) {
    return {
      success: false,
      message: err.message || "Login failed",
    };
  }
};

export async function handleGetCurrentUser() {
  try {
    const result = await getCurrentUser();
    if (result.success) {
      return {
        success: true,
        message: "User data fetched successfully",
        data: result.data,
      };
    }
    return {
      success: false,
      message: result.message || "Failed to fetch user data",
    };
  } catch (error: Error | any) {
    return { success: false, message: error.message };
  }
}
