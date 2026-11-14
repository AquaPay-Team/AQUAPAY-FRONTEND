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

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If a Retailer (Role 8) accesses /admin, redirect to /dashboard
  if (user?.role_id === 8) {
    return <Navigate to="/dashboard" replace />;
  }

  const isAuthorized = Boolean(isAdminUser(user));
  if (!isAuthorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // SuperAdmin (Role 1) is exempt from KYC; Roles 2-7 must complete KYC first
  const isKycDone =
    user?.role_id === 1 ||
    (user?.kyc &&
      ["approved", "completed", "verified", "submitted"].includes(
        String(user.kyc.status || "").toLowerCase()
      ));

  if (!isKycDone) {
    return <Navigate to="/kyc" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
