import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ requireKyc = false }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireKyc) {
    const user = (() => {
      try {
        return JSON.parse(localStorage.getItem("user") || "null");
      } catch {
        return null;
      }
    })();

    // Role 1 (Super Admin) is exempt from KYC
    if (user?.role_id !== 1) {
      const isKycDone =
        user?.kyc &&
        ["approved", "completed", "verified", "submitted"].includes(
          String(user.kyc.status || "").toLowerCase()
        );

      if (!isKycDone) {
        return <Navigate to="/kyc" replace />;
      }
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;