import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../auth/context/AuthProvider";

function ProtectedRoute({ children }) {
  const { accessToken, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <div className="route-loading">Loading...</div>;
  }

  if (!accessToken) {
    // console.log("Token not found");
    // Send them to login, remembering where they were headed
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
