import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import LeaveCalendar from '../../components/employee/leave/LeaveCalendar';
import { getAllLeave } from '../../api/EmployeeApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import UpcomingLeave from '../../components/employee/leave/UpcomingLeave';

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

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[80%] p-8'>
                {!loading
                    ?
                    <div>
                        <UpcomingLeave />
                        <h1 className='text-2xl text-center font-semibold mt-6'>Leave Calendar</h1>
                        <LeaveCalendar events={events} onSelectEvent={handleEventClick} />
                    </div>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default Leave;