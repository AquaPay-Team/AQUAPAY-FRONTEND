import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import UserDashboardPage from "../pages/dashboard/UserDashboardPage";
import KycVerificationPage from "../pages/kyc/KycVerificationPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ForgotPasswordPage />} />

      {/* KYC Route (Requires authentication) */}
      <Route element={<ProtectedRoute requireKyc={false} />}>
        <Route path="/kyc" element={<KycVerificationPage />} />
      </Route>

      {/* Authenticated + KYC Required Routes */}
      <Route element={<ProtectedRoute requireKyc={true} />}>
        <Route path="/dashboard" element={<UserDashboardPage />} />
      </Route>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
