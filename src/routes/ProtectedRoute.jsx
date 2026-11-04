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

    const isKycDone =
      user?.kyc &&
      ["approved", "completed", "verified"].includes(
        String(user.kyc.status || "").toLowerCase()
      );

    if (!isKycDone) {
      return <Navigate to="/kyc" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
