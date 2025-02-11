import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import * as jwt_decode from "jwt-decode";  


const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    const decoded = jwt_decode(token);
    return decoded.role === role ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
