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
    SERVICE: {
      CREATE: "/api/admin/service",
      GETALL: "/api/admin/service",
      GETONE: (serviceId: string) => `/api/admin/service/${serviceId}`,
      UPDATE: (serviceId: string) => `/api/admin/service/${serviceId}`,
      DELETE: (serviceId: string) => `/api/admin/service/${serviceId}`,
      GET_SERVICE_BY_CATEGORY: (categoryId: string) =>
        `api/admin/service/category${categoryId}`,
    },
    USER: {
      CREATE: "/api/admin/users/",
      GET_ALL: "/api/admin/users/",
      GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
      UPDATE: (userId: string) => `/api/admin/users/${userId}`,
      DELETE: (userId: string) => `/api/admin/users/${userId}`,
    },
  },

  USER: {
    CATEGORY: {
      GETALL: "/api/user/category",
    },
  },
};
