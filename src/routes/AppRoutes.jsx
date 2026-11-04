import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import UserDashboardPage from "../pages/dashboard/UserDashboardPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<UserDashboardPage />} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
