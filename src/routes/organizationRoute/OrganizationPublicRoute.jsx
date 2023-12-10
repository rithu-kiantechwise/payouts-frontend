import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const OrganizationPublicRoute = () => {
    const token = localStorage.getItem("organizationToken");

    return token ? (
        <Navigate to={"/organization/dashboard"} />
    ) : (
        <Outlet />
    );
};

export default OrganizationPublicRoute;