export const API = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GETCURRENTUSER: "api/user/me",
    UPDATEPROFILE: "/api/user/update-profile",
    REQUEST_PASSWORD_RESET: "/api/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
  },
  ADMIN: {
    CATEGORY: {
      CREATE: "/api/admin/category",
      GETALL: "api/admin/category",
      GETONE: (categoryId: string) => `/api/admin/category/${categoryId}`,
      UPDATE: (categoryId: string) => `/api/admin/category/${categoryId}`,
      DELETE: (categoryId: string) => `/api/admin/category/${categoryId}`,
    },
  },
};
