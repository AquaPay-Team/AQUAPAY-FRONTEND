import api from "./axios";

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const forgotPassword = async (identifier) => {
  const response = await api.post("/auth/forgot-password", {
    identifier,
  });

  return response.data;
};

export const resetPassword = async ({ token, otp, password }) => {
  const response = await api.post("/auth/reset-password", {
    token,
    otp,
    password,
  });

  return response.data;
};