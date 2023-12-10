import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const EmployeeProtectedRoute = () => {
  const token = localStorage.getItem("employeeToken");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/employee/login"} />
  );
}

export default EmployeeProtectedRoute;