import React from 'react'
import Sidebar from '../../components/admin/adminDashboard/Sidebar';

const AdminDashboard = () => {
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='min-w-[80%] mx-auto p-8'>

            </div>
        </div>
    )
}

export default AdminDashboard;