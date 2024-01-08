import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Sidebar from '../../components/organization/Sidebar';
import toast from 'react-hot-toast';
import { getAllEmployees, updateAllEmployeesTaxes } from '../../api/OrganizationApi';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CSVLink } from 'react-csv';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import LoadingSpinner from '../../components/LoadingSpinner';

const Taxation = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pf: 0,
        esi: 0,
        tax: 0,
        bonus: 0,
    });


    useEffect(() => {
        fetchEmployees();
    }, [])
    const fetchEmployees = async () => {
        try {
            setLoading(true)
            const response = await getAllEmployees({ page: currentPage });
            setLoading(false)
            setEmployeeData(response.data?.employees);
            setTotalPages(response.data?.totalPages);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

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
        const csvData = employeeData.map((item) => ({
            'Employee ID': item.employeeID,
            'Full Name': `${item.firstName} ${item.lastName}`,
            'Email': item.email,
            'Position': item.position,
            'PF': item.pf,
            'Tax': item.tax,
            'ESI': item.esi,
            'Bonus': item.bonus,
        }));

        const headers = [
            'Employee ID', 'Full Name', 'Email', 'Position', 'PF', 'Tax', 'ESI', 'Bonus',
        ];

        const csvReport = {
            data: csvData,
            headers: headers,
            filename: 'employee_tax_details.csv',
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
                            <Text style={styles.tableCell}>Email</Text>
                            <Text style={styles.tableCell}>Position</Text>
                            <Text style={styles.tableCell}>PF</Text>
                            <Text style={styles.tableCell}>Tax</Text>
                            <Text style={styles.tableCell}>ESI</Text>
                            <Text style={styles.tableCell}>Bonus</Text>
                        </View>
                        {employeeData.map((item) => (
                            <View key={item._id} style={{ flexDirection: 'row' }}>
                                <Text style={styles.tableCell}>{item.employeeID}</Text>
                                <Text style={styles.tableCell}>{`${item.firstName} ${item.lastName}`}</Text>
                                <Text style={styles.tableCell}>{item.email}</Text>
                                <Text style={styles.tableCell}>{item.position}</Text>
                                <Text style={styles.tableCell}>{item.pf}</Text>
                                <Text style={styles.tableCell}>{item.tax}</Text>
                                <Text style={styles.tableCell}>{item.esi}</Text>
                                <Text style={styles.tableCell}>{item.bonus}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        );

        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        saveAs(pdfBlob, 'employee_tax_details.pdf');
    };

    const downloadXLSX = () => {
        const ws = XLSX.utils.json_to_sheet(employeeData.map((item) => ({
            'Employee ID': item.employeeID,
            'Full Name': `${item.firstName} ${item.lastName}`,
            'Email': item.email,
            'Position': item.position,
            'PF': item.pf,
            'Tax': item.tax,
            'ESI': item.esi,
            'Bonus': item.bonus,
        })));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'EmployeeTaxDetails');

        XLSX.writeFile(wb, 'employee_tax_details.xlsx');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!isNaN(value) || value === '') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value === '' ? '' : parseFloat(value) || 0,
            }));
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleUpdate = async (employeeID) => {
        try {
            navigate(`/organization/edit-tax`, { state: { employeeID } });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(value => value === '')) {
            toast.error('Please provide values for all fields.');
            return;
        }

        try {
            setLoading(true)
            const response = await updateAllEmployeesTaxes(formData)
            setLoading(false)
            if (response.data.success) {
                toast.success(response.data.message)
                setFormData({
                    pf: 0,
                    esi: 0,
                    tax: 0,
                    bonus: 0,
                });
                fetchEmployees();

            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error setting leave:', error);
            toast.error('An unexpected error occurred while processing your request.');
        }
    };
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='min-w-[80%] mx-auto p-8'>
                {!loading
                    ?
                    <div>

                        <h2 className='text-2xl font-semibold'>Apply tax</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-5 max-w-[40%] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="pf" className="block text-md font-medium leading-6 text-gray-900">
                                        PF <span className='text-gray-400 text-xs'>in percentage</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id='pf'
                                            type="number"
                                            name="pf"
                                            value={formData.pf}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="esi" className="block text-md font-medium leading-6 text-gray-900">
                                        ESI <span className='text-gray-400 text-xs'>in percentage</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id='esi'
                                            type="number"
                                            name="esi"
                                            value={formData.esi}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="tax" className="block text-md font-medium leading-6 text-gray-900">
                                        Tax <span className='text-gray-400 text-xs'>in percentage</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id='tax'
                                            type="number"
                                            name="tax"
                                            value={formData.tax}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="bonus" className="block text-md font-medium leading-6 text-gray-900">
                                        Bonus <span className='text-gray-400 text-xs'>in rupees</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id='bonus'
                                            type="number"
                                            name="bonus"
                                            value={formData.bonus}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-x-6">
                                <button
                                    type='submit'
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Set Tax to all employees
                                </button>
                            </div>
                        </form>

                        <div className='mx-auto min-w-[70%] p-8'>
                            <div className='mt-5'>
                                <h1 className='text-xl font-semibold'>Tax Details</h1>
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
                                            <th className="py-2 px-4 border-b">EmployeeID</th>
                                            <th className="py-2 px-4 border-b">FullName</th>
                                            <th className="py-2 px-4 border-b">Email</th>
                                            <th className="py-2 px-4 border-b">Position</th>
                                            <th className="py-2 px-4 border-b">PF</th>
                                            <th className="py-2 px-4 border-b">TAX</th>
                                            <th className="py-2 px-4 border-b">ESI</th>
                                            <th className="py-2 px-4 border-b">Bonus</th>
                                            <th className="py-2 px-4 border-b">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeData?.map((item) => (
                                            <tr key={item._id}>
                                                <td className="py-2 px-4 border-b">{item.employeeID}</td>
                                                <td className="py-2 px-4 border-b">{item.firstName} {item.lastName}</td>
                                                <td className="py-2 px-4 border-b">{item.email}</td>
                                                <td className="py-2 px-4 border-b">{item.position}</td>
                                                <td className="py-2 px-4 border-b">{item.pf}%</td>
                                                <td className="py-2 px-4 border-b">{item.tax}%</td>
                                                <td className="py-2 px-4 border-b">{item.esi}%</td>
                                                <td className="py-2 px-4 border-b">₹ {item.bonus}</td>
                                                <td className="flex gap-2 py-2 px-4 border-b">
                                                    <button
                                                        onClick={() => handleUpdate(item._id)}
                                                        className='px-4 py-2 bg-blue-800 rounded-md text-white font-medium'>
                                                        Update Tax
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
                    </div>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default Taxation;