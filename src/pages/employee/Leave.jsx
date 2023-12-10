import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import LeaveCalendar from '../../components/employee/leave/LeaveCalendar';
import LeaveForm from '../../components/employee/leave/LeaveForm';
import { getAllLeave } from '../../api/EmployeeApi';

const Leave = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchleaveDetails();
    }, []);

    const fetchleaveDetails = async () => {
        try {
            const response = await getAllLeave();
            setEvents(response.data?.leaves);
        } catch (error) {
            console.log(error);
        }
      
    };

    const handleEventClick = (event) => {
        // Handle event click if needed
        console.log('Event Clicked:', event);
    };

    const handleLeaveSet = (newLeave) => {
        // Update the leave events with the new leave
        setEvents([...events, newLeave]);
    };
    console.log(events, 'eventsssssss');
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[80%] p-8'>
                <h1 className='text-2xl font-semibold'>Leave Application</h1>
                <LeaveForm onLeaveSet={handleLeaveSet} />
                <LeaveCalendar events={events} onSelectEvent={handleEventClick} />
            </div>
        </div>
    )
}

export default Leave;