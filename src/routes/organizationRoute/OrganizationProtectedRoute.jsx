import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const OrganizationProtectedRoute = () => {
    const token = localStorage.getItem("organizationToken");

    return token ? (
        <Outlet />
    ) : (
        <Navigate to={"/organization/login"} />
    );
};

export default OrganizationProtectedRoute;