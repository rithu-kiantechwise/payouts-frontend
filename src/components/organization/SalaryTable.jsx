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

    console.log(salaryDetails, 'salaryDetails');

    const formatDateTime = (dateTime, option) => {
        const options = {
            date: {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
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

    const roundToDecimal = (number, decimalPlaces) => {
        return Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
    };

    const downloadCSV = () => {
        const csvData = salaryDetails.map(employee => ({
            'Employee ID': employee.employeeId,
            'Name': employee.employeeName,
            'Date': employee.checkInTime ? transformDateFormat(formatDateTime(employee.checkInTime, 'date')) : 'N/A',
            'Check-In time': employee.checkInTime ? formatDateTime(employee.checkInTime, 'time') : 'Not Checked in',
            'Check-out time': employee.checkOutTime ? formatDateTime(employee.checkOutTime, 'time') : 'Not Checked out',
            'Total worked hours': roundToDecimal(employee.totalWorkedHours, 2) + ' hours',
        }));

        const headers = [
            { label: 'Employee ID', key: 'Employee ID' },
            { label: 'Name', key: 'Name' },
            { label: 'Date', key: 'Date' },
            { label: 'Check-In time', key: 'Check-In time' },
            { label: 'Check-out time', key: 'Check-out time' },
            { label: 'Total worked hours', key: 'Total worked hours' },
        ];

        return (
            <CSVLink
                data={csvData}
                headers={headers}
                filename={'attendance_details.csv'}
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
        const dataDate = salaryDetails.map((employee) => employee.checkInTime ? transformDateFormat(formatDateTime(employee.checkInTime, 'date')) : 'N/A');
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        doc.setFontSize(15);

        const title = 'Employee Salary Details';
        const headers = [[
            'Employee ID',
            'Name',
            'Date',
            'Check-In time',
            'Check-out time',
            'Total worked hours',
        ]];

        const data = salaryDetails.map(employee => [
            employee.employeeId,
            employee.employeeName,
            employee.checkInTime ? transformDateFormat(formatDateTime(employee.checkInTime, 'date')) : 'N/A',
            employee.checkInTime ? formatDateTime(employee.checkInTime, 'time') : 'Not Checked in',
            employee.checkOutTime ? formatDateTime(employee.checkOutTime, 'time') : 'Not Checked out',
            roundToDecimal(employee.totalWorkedHours, 2) + ' hours'
        ])

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        autoTable(doc, content);

        doc.save(dataDate + 'salary_details.pdf');
    };

    const downloadXLSX = () => {
        const excelData = salaryDetails.map(employee => ({
            'Employee ID': employee.employeeId,
            'Name': employee.employeeName,
            'Date': employee.checkInTime ? transformDateFormat(formatDateTime(employee.checkInTime, 'date')) : 'N/A',
            'Check-In time': employee.checkInTime ? formatDateTime(employee.checkInTime, 'time') : 'Not Checked in',
            'Check-out time': employee.checkOutTime ? formatDateTime(employee.checkOutTime, 'time') : 'Not Checked out',
            'Total worked hours': roundToDecimal(employee.totalWorkedHours, 2) + ' hours',
        }));

        exportExcel(excelData, 'attendance_details.xlsx');
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
                                <th className="py-2 px-4 border-b">Month</th>
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
                            {salaryDetails?.map((data) => (
                                <tr className='text-center' key={data.month}>

                                    <td className="py-2 px-4 border-b">{data.month}</td>
                                    <td className="py-2 px-4 border-b">
                                        ₹ {data.actualSalary}
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