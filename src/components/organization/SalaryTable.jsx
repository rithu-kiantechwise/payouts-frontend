import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { getEmployeeSalary } from '../../api/OrganizationApi';
import { CSVLink } from 'react-csv';
import { exportExcel } from '../../utils/ExcelExport';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SalaryTable = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [salaryDetails, setSalaryDetails] = useState([]);

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                setLoading(true);
                const response = await getEmployeeSalary({ page: currentPage });
                setLoading(false)
                setSalaryDetails(response.data?.salaryDetails);
                setTotalPages(response.data?.totalPages);
            } catch (error) {
                console.error('Error fetching attendance details:', error);
            }
        }
        fetchSalary();
    }, [currentPage]);

    const downloadCSV = () => {
        const csvData = salaryDetails.map(data => {
            const reimbursementDetails = data.reimbursements && data.reimbursements.length > 0
                ? data.reimbursements.map(reimbursement => `₹ ${reimbursement.amount}`).join(', ')
                : 'N/A';

            return {
                'Employee ID': data.employeeId,
                'Employee Name': data.employeeName,
                'Reimbursement': reimbursementDetails,
                'Actual Salary': data.actualSalary,
                'Deduction': data.roundedDeduction,
                'Bonus': data.roundedBonus,
                'Total Salary': data.roundedNetSalary,
            };
        });

        const headers = [
            { label: 'Employee ID', key: 'Employee ID' },
            { label: 'Employee Name', key: 'Employee Name' },
            { label: 'Reimbursement', key: 'Reimbursement' },
            { label: 'Actual Salary', key: 'Actual Salary' },
            { label: 'Deduction', key: 'Deduction' },
            { label: 'Bonus', key: 'Bonus' },
            { label: 'Total Salary', key: 'Total Salary' },
        ];

        return (
            <CSVLink
                data={csvData}
                headers={headers}
                filename={'salary_details.csv'}
                className="ml-2 bg-blue-800 text-white font-semibold py-2 px-4 rounded"
            >
                CSV
            </CSVLink>
        );
    };
    const downloadPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);
        const dateString = salaryDetails.length > 0 ? salaryDetails[0].month : 'N/A';

        const title = 'Employee Salary Details';
        const headers = [
            'Employee ID',
            'Name',
            'Reimbursements',
            'Actual Salary',
            'Deductions',
            'Bonus',
            'Total Salary',

        ];
        const data = salaryDetails.map(data => [
            data.employeeId,
            data.employeeName,
            data.reimbursements && data.reimbursements.length > 0
                ? data.reimbursements.map(reimbursement => `Rs.${reimbursement.amount}`).join(', ')
                : 'N/A',
            data.actualSalary,
            data.roundedDeduction,
            data.roundedBonus,
            data.roundedNetSalary,
        ]);

        let content = {
            startY: 50,
            head: [headers],
            body: data
        };
        doc.text(title, marginLeft, 40);
        autoTable(doc, content);
        doc.save(dateString + '_salary_details.pdf');
    };

    const downloadXLSX = () => {
        const excelData = salaryDetails.map(data => {
            const reimbursementDetails = data.reimbursements && data.reimbursements.length > 0
                ? data.reimbursements.map(reimbursement => `₹ ${reimbursement.amount}`).join(', ')
                : 'N/A';

            return {
                'Employee ID': data.employeeId,
                'Employee Name': data.employeeName,
                'Reimbursement': reimbursementDetails,
                'Actual Salary': data.actualSalary,
                'Deduction': data.roundedDeduction,
                'Bonus': data.roundedBonus,
                'Total Salary': data.roundedNetSalary,
            };
        });
        exportExcel(excelData, '_salary_details.xlsx');
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            {!loading
                ?
                <div className=''>
                    <h1 className='text-2xl font-semibold mb-5'>Employee Salary Details</h1>
                    <div id="pdf-container" className='flex justify-end'>
                        {downloadCSV()}
                        <button onClick={downloadPDF} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            PDF
                        </button>
                        <button onClick={downloadXLSX} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Excel
                        </button>
                    </div>
                    <table className="min-w-full border-gray-300 text-center items-center border rounded-md mt-5">
                        <thead className='bg-slate-800 text-white'>
                            <tr className='text-center'>
                                <th className="py-2 px-4 border-b">Employee Id</th>
                                <th className="py-2 px-4 border-b">Employee Name</th>
                                <th className="py-2 px-4 border-b">Reimbursements</th>
                                <th className="py-2 px-4 border-b">Actual Salary</th>
                                <th className="py-2 px-4 border-b">Deductions</th>
                                <th className="py-2 px-4 border-b">Bonus</th>
                                <th className="py-2 px-4 border-b">Total Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryDetails && salaryDetails.length > 0 && (
                                <>
                                    <tr className='text-center'>
                                        <td colSpan="7" className="py-2 px-4 border-b font-medium text-lg">{salaryDetails[0].month}</td>
                                    </tr>
                                    {salaryDetails.map((data) => (
                                        <tr className='text-center' key={data.employeeId}>
                                            <td className="py-2 px-4 border-b">
                                                {data.employeeId}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {data.employeeName}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                {data.reimbursements && data.reimbursements.length > 0 ? (
                                                    <ul>
                                                        {data.reimbursements.map((reimbursement) => (
                                                            <li key={reimbursement._id}>
                                                                ₹ {reimbursement.amount}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                ₹ {data.actualSalary}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                ₹ {data.roundedDeduction}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                ₹ {data.roundedBonus}
                                            </td>
                                            <td className="py-2 px-4 border-b">
                                                ₹ {data.roundedNetSalary}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 sm:px-6">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> of <span className="font-medium">{totalPages}</span>
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        // disabled={currentPage === totalPages}
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
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
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
};

export default SalaryTable;