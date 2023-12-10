import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const EmployeePublicRoute = () => {
  const token = localStorage.getItem("employeeToken");

  return token ? (
    <Navigate to={"/employee/dashboard"} />
  ) : (
    <Outlet />
  );
};

export default EmployeePublicRoute;