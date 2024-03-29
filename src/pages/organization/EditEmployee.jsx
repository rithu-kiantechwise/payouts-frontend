import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getEmployeeById, updateEmployee } from '../../api/OrganizationApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/organization/Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

const EditEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        phoneNumber: '',
        dob: '',
        salary: '',
        bankAccount: {
            accountHolderName: '',
            accountNumber: '',
            bankName: '',
            branch: '',
            IFSCcode: '',
            upiId: '',
        },
    });

    useEffect(() => {
        const employeeID = location.state?.employeeID
        fetchEmployeeDetails(employeeID);
    }, [location.state?.employeeID]);

    const fetchEmployeeDetails = async (employeeID) => {
        try {
            setLoading(true);
            const response = await getEmployeeById({ employeeID });
            setLoading(false);
            const formattedDob = new Date(response.data.dob).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            setEmployeeData({
                ...response.data,
                dob: formattedDob,
            })
        } catch (error) {
            console.log('employee fetch error:', error);
        }
    };

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            if (name.includes('.')) {
                const [parentProp, childProp] = name.split('.');
                setEmployeeData((prevEmployeeData) => ({
                    ...prevEmployeeData,
                    [parentProp]: {
                        ...prevEmployeeData[parentProp],
                        [childProp]: value,
                    },
                }));
            } else {
                setEmployeeData((prevEmployeeData) => ({
                    ...prevEmployeeData,
                    [name]: value,
                }));
            }
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!employeeData.firstName || !employeeData.lastName || !employeeData.position || !employeeData.phoneNumber || !employeeData.dob || !employeeData.salary) {
                toast.error('All fields are required');
                return;
            }

            // Phone number validation (assuming a simple format)
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(employeeData.phoneNumber)) {
                toast.error('Invalid phone number format (10 digits only)');
                return;
            }

            // Salary validation (assuming it should be a positive number)
            const salary = parseFloat(employeeData.salary);
            if (isNaN(salary) || salary <= 0) {
                toast.error('Invalid salary value. Please enter a positive number');
                return;
            }

            const { _id } = employeeData;
            setLoading(true);
            const response = await updateEmployee(_id, employeeData)
            setLoading(false);
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/organization/employee-details');
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error('Edit failed:');
        }
    };
    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto p-8'>
                {!loading
                    ?
                    <form onSubmit={handleSubmit}>
                        <div className="border-b border-gray-900/10 pb-10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Employee Details</h2>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="employeeID" className="block text-sm font-medium leading-6 text-gray-900">
                                        Employee ID
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="employeeID"
                                            id="employeeID"
                                            required
                                            value={employeeData.employeeID}
                                            onChange={handleChange}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            value={employeeData.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            value={employeeData.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            required
                                            value={employeeData.email}
                                            onChange={handleChange}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="position" className="block text-sm font-medium leading-6 text-gray-900">
                                        Position
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            required
                                            value={employeeData.position}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            required
                                            value={employeeData.phoneNumber}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                        DOB
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="dob"
                                            id="dob"
                                            required
                                            value={employeeData.dob}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                                        Salary
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="salary"
                                            id="salary"
                                            required
                                            value={employeeData.salary}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <h2 className="text-base font-semibold text-gray-900">Bank Account Details</h2>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="accountHolderName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Account Holder Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="bankAccount.accountHolderName"
                                            id="accountHolderName"
                                            value={employeeData.bankAccount.accountHolderName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="accountNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                        Account Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            id="accountNumber"
                                            name="bankAccount.accountNumber"
                                            value={employeeData.bankAccount.accountNumber}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="bankName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Bank Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="bankName"
                                            name="bankAccount.bankName"
                                            value={employeeData.bankAccount.bankName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                                        Branch
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="branch"
                                            name="bankAccount.branch"
                                            value={employeeData.bankAccount.branch}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="IFSCcode" className="block text-sm font-medium leading-6 text-gray-900">
                                        IFSC code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="IFSCcode"
                                            name="bankAccount.IFSCcode"
                                            value={employeeData.bankAccount.IFSCcode}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="upiId" className="block text-sm font-medium leading-6 text-gray-900">
                                        Upi Id
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="upiId"
                                            name="bankAccount.upiId"
                                            value={employeeData.bankAccount.upiId}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => navigate('/organization/employee-details')}
                                className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Save
                            </button>
                        </div>
                    </form>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    )
}

export default EditEmployee;