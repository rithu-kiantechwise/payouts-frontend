import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { getEmployeeAttendance } from '../../api/OrganizationApi';

const AttendanceDetails = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [attendanceDetails, setAttendanceDetails] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const response = await getEmployeeAttendance({ page: currentPage });
                setLoading(false)
                setAttendanceDetails(response.data?.attendanceDetails);
                setTotalPages(response.data?.totalPages);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, [currentPage])

    const formatDateTime = (dateTime, option) => {
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

    const roundToDecimal = (number, decimalPlaces) => {
        return Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {!loading
                ?
                <div className=''>
                    <h1 className='text-2xl font-semibold mb-5'>Employee Attendance Details</h1>
                    {/* <div className='flex justify-end'>
                        {downloadCSV()}
                        <button onClick={downloadPDF} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            PDF
                        </button>
                        <button onClick={downloadXLSX} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Excel
                        </button>
                    </div> */}
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-5">

                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 px-4 border-b">Employee ID</th>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Check-In time</th>
                                <th className="py-2 px-4 border-b">Check-out time</th>
                                <th className="py-2 px-4 border-b">Total worked hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceDetails.map((employee, index) => (
                                <tr key={index}>
                                    <td className="py-2 border-b">{employee.employeeId}</td>
                                    <td className="py-2 border-b">{employee.employeeName}</td>
                                    <td className="py-2 border-b">{employee.checkInTime ? formatDateTime(employee.checkInTime, 'date') : 'N/A'}</td>
                                    <td className="py-2 border-b">{employee.checkInTime ? formatDateTime(employee.checkInTime, 'time') : 'N/A'}</td>
                                    <td className="py-2 border-b">{employee.checkOutTime ? formatDateTime(employee.checkOutTime, 'time') : 'N/A'}</td>
                                    <td className="py-2 border-b">{roundToDecimal(employee.totalWorkedHours, 2)} hours</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
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