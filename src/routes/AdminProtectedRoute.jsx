import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminUser } from "../features/admin/services/adminApi";

export function AdminProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser") || localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const isAuthorized = Boolean(token && isAdminUser(user));

  if (!isAuthorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
