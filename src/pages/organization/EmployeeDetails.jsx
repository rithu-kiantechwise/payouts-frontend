import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../../api/OrganizationApi';
import Sidebar from '../../components/organization/orgDashboard/Sidebar';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from '../../components/LoadingSpinner';


const EmployeeDetails = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const response = await getAllEmployees({ page: currentPage });
                setLoading(false)
                setEmployeeData(response.data?.employees);
                setTotalPages(response.data?.totalPages);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchEmployees();
    }, [currentPage])


    const handleDetails = async (employeeID) => {
        try {
            navigate(`/organization/employee-single`, { state: { employeeID } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            {!loading
                ?
            <div className='mx-auto min-w-[70%] p-8'>
                <div className='mt-5'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h1 className='text-xl font-medium'>Employees</h1>
                            <h4 className='text-md mt-3'>A list of all the users in your account including their name, email and role.</h4>
                        </div>
                        <div className=''>
                            <button
                                onClick={() => navigate('/organization/new-employee')}
                                className='px-3 py-2 bg-violet-700 font-medium text-white rounded mt-5'>
                                Add employee
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-10">
                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 border-b">EmployeeID</th>
                                <th className="py-2 border-b">FullName</th>
                                <th className="py-2 border-b">Email</th>
                                <th className="py-2 border-b">Position</th>
                                <th className="py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {employeeData?.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 border-b">{item.employeeID}</td>
                                    <td className="py-2 border-b">{item.firstName} {item.lastName}</td>
                                    <td className="py-2 border-b">{item.email}</td>
                                    <td className="py-2 border-b">{item.position}</td>
                                    <td className="py-2 border-b">
                                        <button
                                            onClick={() => handleDetails(item._id)}
                                            className='text-violet-800 hover:text-black font-medium px-2 py-1'>
                                            Details
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
            </div>
               :
               <LoadingSpinner />
           }
        </div>
    )
}

export default EmployeeDetails;