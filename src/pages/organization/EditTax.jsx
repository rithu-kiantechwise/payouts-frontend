import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getEmployeeById, updateSelectedEmployeesTaxes } from '../../api/OrganizationApi';
import Sidebar from '../../components/organization/Sidebar';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const EditTax = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        employeeID: '',
        firstName: '',
        lastName: '',
        salary: '',
        bonus: '',
        email: '',
        tax: '',
        esi: '',
        pf: '',
    });
    useEffect(() => {
        const employeeID = location.state?.employeeID
        fetchEmployeeDetails(employeeID)
    }, [location.state?.employeeID]);

    const fetchEmployeeDetails = async (employeeID) => {
        try {
            setLoading(true);
            const response = await getEmployeeById(employeeID);
            setLoading(false);
            setEmployeeData(response.data)
        } catch (error) {
            console.log('employee fetch error:', error);
        }
    };

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setEmployeeData({
                ...employeeData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await updateSelectedEmployeesTaxes(employeeData)
            setLoading(false);

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/organization/employee-tax');
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
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Employee Tax</h2>

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
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            value={`${employeeData.firstName} ${employeeData.lastName}`}
                                            disabled
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
                                            value={employeeData.email}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">
                                        Salary
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            id="salary"
                                            name="salary"
                                            required
                                            value={employeeData.salary}
                                            disabled
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="pf" className="block text-sm font-medium leading-6 text-gray-900">
                                        PF
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="pf"
                                            id="pf"
                                            required
                                            value={employeeData.pf}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="esi" className="block text-sm font-medium leading-6 text-gray-900">
                                        ESI
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="esi"
                                            id="esi"
                                            required
                                            value={employeeData.esi}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="tax" className="block text-sm font-medium leading-6 text-gray-900">
                                        Tax
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="tax"
                                            id="tax"
                                            required
                                            value={employeeData.tax}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="bonus" className="block text-sm font-medium leading-6 text-gray-900">
                                        Bonus
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="bonus"
                                            id="bonus"
                                            required
                                            value={employeeData.bonus}
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
                                onClick={() => navigate('/organization/employee-tax')}
                                className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Apply
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

export default EditTax;