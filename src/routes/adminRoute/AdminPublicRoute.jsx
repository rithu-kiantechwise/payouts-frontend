import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminPublicRoute = () => {
  const token = localStorage.getItem("adminToken");

  return token ? (
    <Navigate to={"/admin"} />
  ) : (
    <Outlet />
  );
}

export default AdminPublicRoute;