import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../../pages/admin/AdminLogin';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import ManageOrganization from '../../pages/admin/ManageOrganization';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import { fetchAdminData } from '../../api/AdminApi';
import AddOrganization from '../../pages/admin/AddOrganization';
import AdminForgotPassword from '../../pages/admin/AdminForgotPassword';

const AdminRoute = () => {
  const dispatch = useDispatch();

  const fetchAdmin = async () => {
      if (localStorage.getItem('adminToken')) {
          const response = await fetchAdminData();
          dispatch(loginUser(response.data?.adminDetail));
      }
  }

  useEffect(() => {
      fetchAdmin();
  });
  return (
   <Routes>
     <Route path='/login/*' element={<AdminLogin />} />
     <Route path='/forgot-password/*' element={<AdminForgotPassword />} />
     <Route path='/dashboard/*' element={<AdminDashboard />} />
     <Route path='/organization-details/*' element={<ManageOrganization />} />
     <Route path='/new-organization/*' element={<AddOrganization />} />
   </Routes>
  )
}

export default AdminRoute;