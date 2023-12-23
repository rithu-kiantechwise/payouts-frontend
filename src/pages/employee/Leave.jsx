import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import LeaveCalendar from '../../components/employee/leave/LeaveCalendar';
import LeaveForm from '../../components/employee/leave/LeaveForm';
import { getAllLeave } from '../../api/EmployeeApi';
import LoadingSpinner from '../../components/LoadingSpinner';

const Leave = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchleaveDetails();
    }, []);

    const fetchleaveDetails = async () => {
        try {
            setLoading(true)

            const response = await getAllLeave();
            setLoading(false)

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
        setEvents([...events, newLeave]);
    };
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            {!loading
                ?
            <div className='mx-auto min-w-[80%] p-8'>
                <h1 className='text-2xl font-semibold'>Leave Application</h1>
                <LeaveForm onLeaveSet={handleLeaveSet} />
                <h1 className='text-2xl text-center font-semibold mt-6'>Leave Calendar</h1>
                <LeaveCalendar events={events} onSelectEvent={handleEventClick} />
            </div>
                :
                <LoadingSpinner />
            }
        </div>
    )
}

export default Leave;