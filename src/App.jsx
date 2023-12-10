import React from 'react'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute';
import EmployeeRoute from './routes/employeeRoute/EmployeeRoute';
import AdminRoute from './routes/adminRoute/AdminRoute';
import OrganizationRoute from './routes/organizationRoute/OrganizationRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/*' element={<PublicRoute />} />
        <Route path='/employee/*' element={<EmployeeRoute />} />
        <Route path='/admin/*' element={<AdminRoute />} />
        <Route path='/organization/*' element={<OrganizationRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;