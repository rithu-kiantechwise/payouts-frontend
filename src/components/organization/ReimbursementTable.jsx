import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { getReimbursement, updateReimbursementStatus } from '../../api/OrganizationApi';
import toast from 'react-hot-toast';
import { Dropdown } from 'flowbite-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CSVLink } from 'react-csv';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import LoadingSpinner from '../LoadingSpinner';

const ReimbursementTable = () => {
    const [reimbursements, setReimbursements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReimbursement = async () => {
            try {
                setLoading(true)
                const response = await getReimbursement({ page: currentPage });
                setLoading(false)

                setReimbursements(response.data?.reimbursement);
                setTotalPages(response.data?.totalPages);

            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
        fetchReimbursement();
    }, [currentPage]);


    const handleStatus = async (reimbursementId, newStatus) => {
        try {
            const currentStatus = reimbursements.find((r) => r._id === reimbursementId)?.status;

            if (currentStatus === 'Approved' || currentStatus === 'Rejected') {
                toast.error('Cannot update status. Status is already Approved or Rejected.')
                return;
            }
            setLoading(true)

            await updateReimbursementStatus({ reimbursementId, newStatus });
            setLoading(false)

            setReimbursements((prevReimbursements) =>
                prevReimbursements.map((reimbursement) =>
                    reimbursement._id === reimbursementId
                        ? { ...reimbursement, status: newStatus }
                        : reimbursement
                )
            );
        } catch (error) {
            console.error('Error updating reimbursement status:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
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
        const csvData = reimbursements?.map((reimbursement) => ({
            'Image': reimbursement.imageUrl,
            'Employee ID': reimbursement.employeeId?.employeeID,
            'Full Name': `${reimbursement.employeeId?.firstName} ${reimbursement.employeeId?.lastName}`,
            'Amount': reimbursement.amount,
            'Description': reimbursement.description,
            'Status': reimbursement.status,
        }));
        console.log(csvData, 'csvvvv');

        const headers = [
            { label: 'Image', key: 'Image' },
            { label: 'Employee ID', key: 'Employee ID' },
            { label: 'Full Name', key: 'Full Name' },
            { label: 'Amount', key: 'Amount' },
            { label: 'Description', key: 'Description' },
            { label: 'Status', key: 'Status' },
        ];

        const csvReport = {
            data: csvData,
            headers: headers,
            filename: 'reimbursements.csv',
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
                            <Text style={styles.tableCell}>Image</Text>
                            <Text style={styles.tableCell}>Employee ID</Text>
                            <Text style={styles.tableCell}>Full Name</Text>
                            <Text style={styles.tableCell}>Amount</Text>
                            <Text style={styles.tableCell}>Description</Text>
                            <Text style={styles.tableCell}>Status</Text>
                        </View>
                        {reimbursements.map((reimbursement) => (
                            <View key={reimbursement._id} style={{ flexDirection: 'row' }}>
                                <Text style={styles.tableCell}>{reimbursement.imageUrl}</Text>
                                <Text style={styles.tableCell}>{reimbursement.employeeId?.employeeID}</Text>
                                <Text style={styles.tableCell}>
                                    {`${reimbursement.employeeId?.firstName} ${reimbursement.employeeId?.lastName}`}
                                </Text>
                                <Text style={styles.tableCell}>{reimbursement.amount}</Text>
                                <Text style={styles.tableCell}>{reimbursement.description}</Text>
                                <Text style={styles.tableCell}>{reimbursement.status}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        );

        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        saveAs(pdfBlob, 'reimbursements.pdf');
    };

    const downloadXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(reimbursements.map((reimbursement) => ({
            'Image': reimbursement.imageUrl,
            'Employee ID': reimbursement.employeeId?.employeeID,
            'Full Name': `${reimbursement.employeeId?.firstName} ${reimbursement.employeeId?.lastName}`,
            'Amount': reimbursement.amount,
            'Description': reimbursement.description,
            'Status': reimbursement.status,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reimbursements');

        XLSX.writeFile(wb, 'reimbursements.xlsx');
    };

    return (
        <>
        {!loading
            ?
        <div className=''>
            <h1 className='text-2xl font-semibold mb-5'>Reimbursement Claims</h1>
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
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Employee ID</th>
                        <th className="py-2 px-4 border-b">Full Name</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursement) => (
                        <tr key={reimbursement?._id}>
                            <td className="py-2 px-4 border-b">
                                <a href={reimbursement?.imageUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={reimbursement?.imageUrl} alt="reimbursementImg" className='w-10 h-10' />
                                </a>
                            </td>
                            <td className="py-2 px-4 border-b">{reimbursement?.employeeId?.employeeID}</td>
                            <td className="py-2 px-4 border-b">{reimbursement.employeeId?.firstName + ' ' + reimbursement.employeeId?.lastName}</td>
                            <td className="py-2 px-4 border-b">{reimbursement?.amount}</td>
                            <td className="py-2 px-4 border-b">{reimbursement?.description}</td>
                            <td className={`py-2 px-4 border-b font-medium ${getStatusColor(reimbursement.status)}`}>{reimbursement?.status}</td>
                            <td className="py-2 px-4 border-b">
                                <Dropdown label="Update" dismissOnClick={false}>
                                    <Dropdown.Item onClick={() => handleStatus(reimbursement._id, 'Approved')} className='text-green-700'>Approve</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatus(reimbursement._id, 'Rejected')} className='text-red-700'>Reject</Dropdown.Item>
                                </Dropdown>
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

export default ReimbursementTable;