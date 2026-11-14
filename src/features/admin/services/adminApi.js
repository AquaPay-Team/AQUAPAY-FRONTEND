import api from "../../../api/axios";

/**
 * Admin Authentication & Backend-Backed API Service
 * Exclusively provides functionality backed by real backend endpoints:
 * - Authentication: POST /api/auth/login, GET /api/auth/me
 * - User Management: GET /api/users, POST /api/users, PATCH /api/users/:id, GET /api/users/:id
 */

export const ADMIN_ROLES = ["Admin", "Sub Admin", "AD", "SA", "Super Admin", "SuperAdmin"];

export function isAdminUser(user) {
  if (!user) return false;
  // Role ID 1 is Admin, Role ID 2 is Sub Admin
  if (user.role_id === 1 || user.role_id === 2) return true;
  const roleName = String(user.role_name || "").trim().toUpperCase();
  const roleSlug = String(user.role_slug || "").trim().toUpperCase();
  return (
    roleName.includes("ADMIN") ||
    roleSlug === "AD" ||
    roleSlug === "SA" ||
    ADMIN_ROLES.some((r) => r.toUpperCase() === roleName || r.toUpperCase() === roleSlug)
  );
}

// 1. Admin Authentication
export const adminLogin = async ({ identifier, password }) => {
  const response = await api.post("/auth/login", {
    identifier: identifier.trim(),
    password,
  });

  if (!response?.data?.success) {
    throw new Error(response?.data?.message || "Admin authentication failed");
  }

  const { accessToken, user } = response.data.data;

  // Verify that the account has administrator privileges
  if (!isAdminUser(user)) {
    throw new Error(
      "Access Denied: Your account does not have administrative privileges. Please log in through the Merchant Portal."
    );
  }

  // Store credentials in localStorage
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("adminUser", JSON.stringify(user));
  }

  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("adminUser");
};

// 2. Real Backend Users Management
export const fetchBackendUsers = async (params = {}) => {
  const response = await api.get("/users", { params });
  return response.data;
};

export const fetchBackendUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createBackendUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateBackendUser = async (id, userData) => {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
};

export default {
  adminLogin,
  getAdminProfile,
  adminLogout,
  isAdminUser,
  fetchBackendUsers,
  fetchBackendUserById,
  createBackendUser,
  updateBackendUser,
  ADMIN_ROLES,
};
