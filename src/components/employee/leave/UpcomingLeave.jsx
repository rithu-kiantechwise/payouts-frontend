import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { getUpcomingLeave } from '../../../api/EmployeeApi';

const UpcomingLeave = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [upcomingLeave, setUpcomingLeave] = useState([]);

    useEffect(() => {
        const fetchUpcomingLeaves = async () => {
            try {
                setLoading(true);
                const response = await getUpcomingLeave({ page: currentPage });
                setLoading(false);
                setUpcomingLeave(response?.data?.upcomingLeaves);
                setTotalPages(response?.data?.totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUpcomingLeaves();
    }, [currentPage]);

    const handleEdit = async (leaveId) => {
        try {
            navigate(`/employee/leave-apply`, { state: { leaveId } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const formatDateTime = (dateTime, option) => {
        if (!dateTime) {
            return 'N/A';
        }
        if (option === 'transform') {
            const [month, day, year] = dateTime.split('/');
            return `${day}/${month}/${year}`;
        }
        const options = {
            date: {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            },
            time: {
                hour: 'numeric',
                minute: 'numeric',
            }
        };
        return new Intl.DateTimeFormat('en-GB', options[option]).format(new Date(dateTime));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'text-green-700';
            case 'Rejected':
                return 'text-red-700';
            case 'Pending':
                return 'text-orange-500';
            default:
                return '';
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {!loading
                ?
                <div className='mt-5'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h1 className='text-xl font-medium'>Upcoming Leaves</h1>
                            <h4 className='text-md mt-3'>A list of all the upcoming leave in your account including their date and status.</h4>
                        </div>
                        <div className=''>
                            <button
                                onClick={() => navigate('/employee/leave-apply')}
                                className='px-3 py-2 bg-violet-700 font-medium text-white rounded mt-5'>
                                Apply for leave
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-10">
                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 border-b">Applied On</th>
                                <th className="py-2 border-b">Start Date</th>
                                <th className="py-2 border-b">End Date</th>
                                <th className="py-2 border-b">Start Time</th>
                                <th className="py-2 border-b">End Time</th>
                                <th className="py-2 border-b">Status</th>
                                <th className="py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {upcomingLeave?.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 border-b">
                                        {formatDateTime(item.createdAt, 'date')}
                                    </td>
                                    <td className="py-2 border-b">
                                        {formatDateTime(item.startDate, 'date')}
                                    </td>
                                    <td className="py-2 border-b">
                                        {formatDateTime(item.endDate, 'date')}
                                    </td>
                                    <td className="py-2 border-b">{item.startTime}</td>
                                    <td className="py-2 border-b">{item.endTime}</td>
                                    <td className={`py-2 px-4 border-b font-medium ${getStatusColor(item.status)}`}>{item.status}</td>
                                    <td className="py-2 border-b">
                                        <button
                                            onClick={() => handleEdit(item._id)}
                                            className='text-violet-800 hover:text-black font-medium px-2 py-1'>
                                            Edit
                                        </button>
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

export default UpcomingLeave;