import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import UserDashboardPage from "../pages/dashboard/UserDashboardPage";
import AdminDashboardPage from "../pages/dashboard/AdminDashboardPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import KycVerificationPage from "../pages/kyc/KycVerificationPage";
import UserProtectedRoute from "./UserProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. Separate Login Entry Points */}
      <Route path="/login/admin" element={<AdminLoginPage />} />
      <Route path="/login/user" element={<LoginPage />} />

      {/* Backward-Compatible Login Aliases */}
      <Route path="/admin/login" element={<Navigate to="/login/admin" replace />} />
      <Route path="/login" element={<Navigate to="/login/user" replace />} />

      {/* Password Recovery Routes */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ForgotPasswordPage />} />

      {/* 2. KYC Onboarding Route (Requires normal user auth, KYC exempt until submitted) */}
      <Route element={<UserProtectedRoute requireKyc={false} />}>
        <Route path="/kyc" element={<KycVerificationPage />} />
      </Route>

      {/* 3. Normal User Protected Routes (/user/* and /dashboard) */}
      <Route element={<UserProtectedRoute requireKyc={true} />}>
        <Route path="/user/dashboard" element={<UserDashboardPage />} />
        <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
        <Route path="/user/*" element={<UserDashboardPage />} />
        <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />
      </Route>

      {/* 4. Admin Protected Routes (/admin/*) */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/*" element={<AdminDashboardPage />} />
      </Route>

      {/* Default Fallback */}
      <Route path="/" element={<Navigate to="/login/user" replace />} />
      <Route path="*" element={<Navigate to="/login/user" replace />} />
    </Routes>
  );
}

export default AppRoutes;
