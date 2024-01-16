import React from 'react'
import Sidebar from '../../components/organization/Sidebar';
import SalaryTable from '../../components/organization/SalaryTable';

const SalaryDetails = () => {
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[70%] p-8'>
                <SalaryTable />
            </div>
        </div>
    )
}

export default SalaryDetails;