import React from 'react';
import Reimbursement from '../../components/employee/empSalaryDetails/Reimbursement';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import MonthlySalaryDetails from '../../components/employee/empDashboard/MonthlySalaryDetails';

const SalaryDetails = () => {

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[80%] p-6 '>
                <Reimbursement />
                <MonthlySalaryDetails />
            </div>
        </div>
    )
}

export default SalaryDetails;