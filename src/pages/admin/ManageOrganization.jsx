import React from 'react'
import Sidebar from '../../components/admin/adminDashboard/Sidebar';
import OrganizationDetails from '../../components/admin/OrganizationDetails';

const ManageOrganization = () => {
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='min-w-[80%] mx-auto p-8'>
                <OrganizationDetails />
            </div>
        </div>
    )
}

export default ManageOrganization;