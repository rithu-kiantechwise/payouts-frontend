import React from 'react';
import AttendanceDetails from '../../components/organization/AttendanceDetails';
import Sidebar from '../../components/organization/Sidebar';

const Attendance = () => {
  return (
    <div className='flex min-h-[100vh]'>
      <Sidebar />
      <div className='mx-auto min-w-[70%] p-8'>
        <AttendanceDetails />
      </div>
    </div>
  )
};

export default Attendance;