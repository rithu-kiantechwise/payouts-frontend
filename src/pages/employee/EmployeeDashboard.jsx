import React from 'react'
import Attendance from '../../components/employee/empDashboard/Attendance';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import AttendanceDetails from '../../components/employee/empDashboard/AttendanceDetails';
const EmployeeDashboard = () => {
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className="min-w-[80%] mx-auto p-6">
                <Attendance />
                <AttendanceDetails/>
            </div>
        </div>
    )
}

export default EmployeeDashboard;