import React, { useState } from 'react'
import Attendance from '../../components/employee/empDashboard/Attendance';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import AttendanceDetails from '../../components/employee/empDashboard/AttendanceDetails';
const EmployeeDashboard = () => {
    const [isEmployeeCheckedIn, setIsEmployeeCheckedIn] = useState(false);

    const handleCheckInChange = (isCheckedIn) => {
      setIsEmployeeCheckedIn(isCheckedIn);
    };
  
    const handleCheckOutChange = (isCheckedOut) => {
      setIsEmployeeCheckedIn(!isCheckedOut);
    };
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className="min-w-[80%] mx-auto p-6">
                <Attendance  
                  onCheckInChange={handleCheckInChange}
                  onCheckOutChange={handleCheckOutChange}
                  />
                <AttendanceDetails isEmployeeCheckedIn={isEmployeeCheckedIn}/>
            </div>
        </div>
    )
}

export default EmployeeDashboard;