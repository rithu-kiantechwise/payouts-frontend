import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../../pages/employee/EmployeeDashboard';
import EmployeeLogin from '../../pages/employee/EmployeeLogin';
import SalaryDetails from '../../pages/employee/SalaryDetails';
import Leave from '../../pages/employee/Leave';
import EmployeeProfile from '../../pages/employee/EmployeeProfile';
import EmployeePublicRoute from './EmployeePublicRoute';
import EmployeeProtectedRoute from './EmployeeProtectedRoute';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import { fetchEmployeeData } from '../../api/EmployeeApi';
import EmpForgotPassword from '../../pages/employee/EmpForgotPassword';
import EmpProfileEdit from '../../pages/employee/EmpProfileEdit';

const EmployeeRoute = () => {
    const dispatch = useDispatch();

    const fetchEmployee = async () => {
        if (localStorage.getItem('employeeToken')) {
            const response = await fetchEmployeeData();
            dispatch(loginUser(response.data?.employeeDetail));
        }
    }

    useEffect(() => {
        fetchEmployee()
    });
    return (
        <Routes>
            <Route element={<EmployeePublicRoute />}>

                <Route path='/login/*' element={<EmployeeLogin />} />
                <Route path='/forgot-password/*' element={<EmpForgotPassword />} />

            </Route>
            <Route element={<EmployeeProtectedRoute />}>

                <Route path='/dashboard/*' element={<EmployeeDashboard />} />
                <Route path='/salary-details/*' element={<SalaryDetails />} />
                <Route path='/leave-calendar/*' element={<Leave />} />
                <Route path='/employee-profile/*' element={<EmployeeProfile />} />
                <Route path='/edit-profile/*' element={<EmpProfileEdit />} />

            </Route>
        </Routes>
    )
}

export default EmployeeRoute;