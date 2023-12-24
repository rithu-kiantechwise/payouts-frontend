import React, { useEffect, useState } from 'react'
import { getSalaryDetails } from '../../../api/EmployeeApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from '../../LoadingSpinner';

const MonthlySalaryDetails = () => {
    const [salaryDetails, setSalaryDetails] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                setLoading(true)
                const response = await getSalaryDetails({ page: currentPage });
                setLoading(false)
                setSalaryDetails(response.data.salaryDetailsByMonth);
                setTotalPages(response.data?.totalPages);

            } catch (error) {
                console.error("Error fetching salary details:", error);
            }
        };
        fetchSalaryDetails();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {!loading
                ?
                <div className='p-2'>
                    <h2 className='text-2xl font-semibold p-5'>Monthly Salary Details</h2>
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-5">
                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 px-4 border-b">Month</th>
                                <th className="py-2 px-4 border-b">Reimbursements</th>
                                <th className="py-2 px-4 border-b">Actual Salary</th>
                                <th className="py-2 px-4 border-b">PF</th>
                                <th className="py-2 px-4 border-b">ESI</th>
                                <th className="py-2 px-4 border-b">Tax</th>
                                <th className="py-2 px-4 border-b">Bonus</th>
                                <th className="py-2 px-4 border-b">Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryDetails?.map((data) => (
                                <tr className='text-center' key={data.month}>
                                    <td>{data.month}</td>
                                    <td className="py-2 px-4 border-b">
                                        <ul>
                                            {data.reimbursements.map((reimbursement) => (
                                                <li key={reimbursement._id}>
                                                    ₹ {reimbursement.amount}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.actualSalary}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.roundedPf}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.roundedEsi}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.roundedTax}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.roundedBonus}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.roundedNetSalary}
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

export default MonthlySalaryDetails;