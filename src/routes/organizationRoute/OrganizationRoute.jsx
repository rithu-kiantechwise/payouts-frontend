import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { loginUser } from '../../redux/userSlice';
import { fetchOrganizationData } from '../../api/OrganizationApi';
import Registration from '../../pages/public/Registration';
import Login from '../../pages/public/Login';
import OrganizationDashboard from '../../pages/organization/OrganizationDashboard';
import EmployeeDetails from '../../pages/organization/EmployeeDetails';
import OrganizationProfile from '../../pages/organization/OrganizationProfile';
import AddEmployee from '../../pages/organization/AddEmployee';
import OrganizationProtectedRoute from './OrganizationProtectedRoute';
import OrganizationPublicRoute from './OrganizationPublicRoute'
import EditEmployee from '../../pages/organization/EditEmployee';
import OrgForgotPassword from '../../pages/organization/OrgForgotPassword';
import OrgProfileEdit from '../../pages/organization/OrgProfileEdit';
import SingleEmployeePage from '../../pages/organization/SingleEmployeePage';
import Taxation from '../../pages/organization/Taxation';
import EditTax from '../../pages/organization/EditTax';
import Attendance from '../../pages/organization/Attendance';

const OrganizationRoute = () => {
  const dispatch = useDispatch();

  const fetchOrganization = async () => {
    if (localStorage.getItem('organizationToken')) {
      const response = await fetchOrganizationData();
      dispatch(loginUser(response?.data));
    }
  }

  useEffect(() => {
    fetchOrganization();
  });

  return (
    <Routes>
      <Route element={<OrganizationPublicRoute />}>

        <Route path='/register/*' element={<Registration />} />
        <Route path='/login/*' element={<Login />} />
        <Route path='/forgot-password/*' element={<OrgForgotPassword />} />

      </Route>
      <Route element={<OrganizationProtectedRoute />}>

        <Route path='/dashboard/*' element={<OrganizationDashboard />} />
        <Route path='/organization-profile/*' element={<OrganizationProfile />} />
        <Route path='/employee-attendance/*' element={<Attendance />} />
        <Route path='/employee-details/*' element={<EmployeeDetails />} />
        <Route path='/employee-single/*' element={<SingleEmployeePage />} />
        <Route path='/new-employee/*' element={<AddEmployee />} />
        <Route path='/edit-employee/*' element={<EditEmployee />} />
        <Route path='/edit-profile/*' element={<OrgProfileEdit />} />
        <Route path='/employee-tax/*' element={<Taxation />} />
        <Route path='/edit-tax/*' element={<EditTax />} />

      </Route>
    </Routes>
  )
}

export default OrganizationRoute;