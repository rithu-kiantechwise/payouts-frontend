import React, { useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/admin/adminDashboard/Sidebar';

const AddOrganization = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [organizationData, setOrganizationData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        location: '',
    });

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setOrganizationData({
                ...organizationData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setLoading(true)
            // const response = await employeeRegister(organizationData)
            // setLoading(false)
            // if (response.data.success) {
            //     toast.success(response.data.message)
            // } else {
            //     toast.error(response.data.message)
            // }
            // setOrganizationData({
            //     employeeID: '',
            //     firstName: '',
            //     lastName: '',
            //     email: '',
            //     password: '',
            //     phoneNumber: '',
            //     dob: '',
            //     salary: '',
            //     position: '',
            // });
        } catch (error) {
            toast.error('Something went wrong please try again')
        }
    };

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <>
                {!loading
                    ?
                    <div className='mx-auto p-8'>
                        <form onSubmit={handleSubmit}>
                            <div className="border-b border-gray-900/10 pb-10">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Organization</h2>
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
                                                value={organizationData.employeeID}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                value={organizationData.firstName}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                value={organizationData.lastName}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                value={organizationData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                value={organizationData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                value={organizationData.position}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                required
                                                value={organizationData.phoneNumber}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                value={organizationData.dob}
                                                onChange={handleChange}
                                                max={new Date().toISOString().split('T')[0]}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                                            Salary
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="salary"
                                                id="salary"
                                                required
                                                value={organizationData.salary}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <LoadingSpinner />
                }
            </>
        </div>
    )
}

export default AddOrganization;