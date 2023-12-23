import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { getLeaveDetails, updateLeaveStatus } from '../../../api/OrganizationApi';
import toast from 'react-hot-toast';
import { Dropdown } from 'flowbite-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CSVLink } from 'react-csv';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import LoadingSpinner from '../../LoadingSpinner';

const EmpLeaveTable = () => {
    const [leaveDetails, setLeaveDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchAllEmployeesLeaveDetails = async () => {
            try {
                setLoading(true)
                const response = await getLeaveDetails({ page: currentPage });
                setLoading(false)
                if (response.data.success) {
                    setLeaveDetails(response.data?.employeeAndLeaveDetails);
                    setTotalPages(response.data?.totalPages);

                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.error('Error fetching leave:', error);

            }
        };
        fetchAllEmployeesLeaveDetails();
    }, [currentPage]);

    const styles = StyleSheet.create({
        table: {
            width: '100%',
            border: '1px solid black',
            borderCollapse: 'collapse',
        },
        tableCell: {
            border: '1px solid black',
            padding: '8px',
        },
    });

    const downloadCSV = () => {
        const csvData = leaveDetails.reduce((acc, { employee, leaveDetails }) => {
            const employeeData = leaveDetails.map((leave) => ({
                'Employee ID': employee?.employeeID,
                'Full Name': `${employee?.firstName} ${employee?.lastName}`,
                'Leave Date': `${new Date(leave?.startDate).toLocaleDateString()} - ${new Date(leave?.endDate).toLocaleDateString()}`,
                'Reason': leave?.reason,
                'Status': leave?.status,
            }));

            return [...acc, ...employeeData];
        }, []);

        const headers = [
            'Employee ID', 'Full Name', 'Leave Date', 'Reason', 'Status',
        ];

        const csvReport = {
            data: csvData,
            headers: headers,
            filename: 'employee_leaves.csv',
        };

        return (
            <CSVLink {...csvReport} className='bg-blue-800 text-white font-semibold rounded px-4 py-2'>
                CSV
            </CSVLink>
        );
    };

    const downloadPDF = () => {
        const pdfData = (
            <Document>
                <Page size="A4">
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.tableCell}>Employee ID</Text>
                            <Text style={styles.tableCell}>Full Name</Text>
                            <Text style={styles.tableCell}>Leave Date</Text>
                            <Text style={styles.tableCell}>Reason</Text>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        {leaveDetails.map(({ employee, leaveDetails }) => (
                            sortLeaveDetails(leaveDetails).map((leave) => (
                                <View key={leave._id} style={{ flexDirection: 'row' }}>
                                    <Text style={styles.tableCell}>{employee?.employeeID}</Text>
                                    <Text style={styles.tableCell}>{`${employee?.firstName} ${employee?.lastName}`}</Text>
                                    <Text style={styles.tableCell}>
                                        {`${new Date(leave?.startDate).toLocaleDateString()} - ${new Date(leave?.endDate).toLocaleDateString()}`}
                                    </Text>
                                    <Text style={styles.tableCell}>{leave?.reason}</Text>
                                    <Text style={styles.tableCell}>{leave?.status}</Text>
                                </View>
                            ))
                        ))}
                    </View>
                </Page>
            </Document>
        );

        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        saveAs(pdfBlob, 'employee_leaves.pdf');
    };

    const downloadXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(leaveDetails.reduce((acc, { employee, leaveDetails }) => {
            const employeeData = leaveDetails.map((leave) => ({
                'Employee ID': employee?.employeeID,
                'Full Name': `${employee?.firstName} ${employee?.lastName}`,
                'Leave Date': `${new Date(leave?.startDate).toLocaleDateString()} - ${new Date(leave?.endDate).toLocaleDateString()}`,
                'Reason': leave?.reason,
                'Status': leave?.status,
            }));

            return [...acc, ...employeeData];
        }, []));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'EmployeeLeaves');

        XLSX.writeFile(wb, 'employee_leaves.xlsx');
    };

    const handleLeaveStatus = async (leaveId, newStatus) => {
        try {
            const currentStatus = leaveDetails.map(({ employee, leaveDetails }) => ({
                employee,
                leaveDetails: leaveDetails.find((leave) => leave._id === leaveId)?.status
            }))
            const isAnyLeaveApprovedOrRejected = currentStatus.some(
                (item) => item.leaveDetails === 'Approved' || item.leaveDetails === 'Rejected'
            );
            if (isAnyLeaveApprovedOrRejected) {
                toast.error('Cannot update status. Status is already Approved or Rejected.');
                return;
            }

            const response = await updateLeaveStatus({ leaveId, newStatus });
            if (response.data.success) {
                setLeaveDetails((prevLeaveDetails) =>
                    prevLeaveDetails.map(({ employee, leaveDetails }) => ({
                        employee,
                        leaveDetails: leaveDetails.map((leave) =>
                            leave._id === leaveId ? { ...leave, status: newStatus } : leave
                        ),
                    }))
                );
            }
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <>
        {!loading
            ?
        <div className='mt-10'>
            <h1 className='text-2xl font-semibold mb-5'>Employee Leaves</h1>
            <div className='flex justify-end'>
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
                        <th className="py-2 px-4 border-b">Employee ID</th>
                        <th className="py-2 px-4 border-b">Full Name</th>
                        <th className="py-2 px-4 border-b">Leave Date</th>
                        <th className="py-2 px-4 border-b">Reason</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveDetails.map(({ employee, leaveDetails }) => (
                        <React.Fragment key={employee._id}>
                            {sortLeaveDetails(leaveDetails).map((leave) => (
                                <tr key={leave._id}>
                                    <td className="py-2 px-4 border-b">{employee?.employeeID}</td>
                                    <td className="py-2 px-4 border-b">{employee?.firstName} {employee?.lastName}</td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(leave?.startDate).toLocaleDateString()} - {new Date(leave?.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border-b">{leave?.reason}</td>
                                    <td className={`py-2 px-4 border-b font-medium ${getStatusColor(leave?.status)}`}>{leave?.status}</td>

                                    <td className="py-2 px-4 border-b">
                                        <Dropdown label="Update" dismissOnClick={false}>
                                            <Dropdown.Item onClick={() => handleLeaveStatus(leave._id, 'Approved')} className='text-green-700'>Approve</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleLeaveStatus(leave._id, 'Rejected')} className='text-red-700'>Reject</Dropdown.Item>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
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

const sortLeaveDetails = (leaveDetails) => {
    if (!leaveDetails) {
        return [];
    }
    return leaveDetails.sort((a, b) => {
        const statusComparison = a.status === 'Pending' ? -1 : b.status === 'Pending' ? 1 : 0;

        if (statusComparison !== 0) {
            return statusComparison;
        }

        return new Date(a.startDate) - new Date(b.startDate);
    });
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

export default EmpLeaveTable;