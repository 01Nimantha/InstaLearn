import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../pages/getUserRole";

const ProtectedRoute = ({ allowedRoles,children }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(userRole) ? children: <Navigate to="/" replace />;
  // return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
