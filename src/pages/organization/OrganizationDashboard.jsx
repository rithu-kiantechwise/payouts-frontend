import React from 'react';
import Sidebar from '../../components/organization/Sidebar';
import EmpLeaveTable from '../../components/organization/EmpLeaveTable';
import ReimbursementTable from '../../components/organization/ReimbursementTable';

const OrganizationDashboard = () => {

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='min-w-[80%] mx-auto p-8'>
                <ReimbursementTable />
                <EmpLeaveTable />
            </div>
        </div>
    )
};

export default OrganizationDashboard;