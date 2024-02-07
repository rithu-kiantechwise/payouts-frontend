import React, { useEffect, useState } from 'react'
import { getAttendanceDetails } from '../../../api/EmployeeApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from '../../LoadingSpinner';

const AttendanceDetails = ({ isEmployeeCheckedIn }) => {
    const [attendanceDetails, setAttendanceDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                setLoading(true)
                const response = await getAttendanceDetails({ page: currentPage });
                setLoading(false)

                setAttendanceDetails(response.data.attendanceDetails);
                setTotalPages(response.data?.totalPages);
            } catch (error) {
                console.error("Error fetching salary details:", error);
            }
        };
        fetchSalaryDetails();
    }, [currentPage, isEmployeeCheckedIn]);

    const formatDateTime = (dateTime, option) => {
        if (!dateTime) {
            return 'N/A';
        }
        
        const options = {
            date: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            },
            time: {
                hour: 'numeric',
                minute: 'numeric'
            }
        };

        return new Intl.DateTimeFormat('en-US', options[option]).format(new Date(dateTime));
    };
    const transformDateFormat = (originalDate) => {
        const [month, day, year] = originalDate.split('/');
        return `${day}/${month}/${year}`;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {!loading
                ?
                <div className='p-2'>
                    <h2 className='text-2xl font-semibold p-5'>Attendance Details</h2>
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-5">
                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">CheckIn</th>
                                <th className="py-2 px-4 border-b">CheckOut</th>
                                <th className="py-2 px-4 border-b">Total hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceDetails?.map((data, index) => (
                                <tr className='text-center' key={index}>
                                    <td className="py-2 px-4 border-b">
                                        {transformDateFormat(formatDateTime(data.date, 'date'))}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {data.checkInTime ? formatDateTime(data.checkInTime, 'time') : 'Not Checked in'}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {data.checkOutTime ? formatDateTime(data.checkOutTime, 'time') : 'Not Checked out'}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {data.totalWorkedHours}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span>
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        aria-current="page"
                                        disabled
                                        className="relative z-10 inline-flex items-center bg-violet-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        {currentPage}
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <LoadingSpinner />
            }
        </>
    )
}

export default AttendanceDetails;