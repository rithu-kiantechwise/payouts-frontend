import React, { useState } from 'react';
import { applyLeave } from '../../../api/EmployeeApi';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../LoadingSpinner';

const LeaveForm = ({ onLeaveSet }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const minDate = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
      const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)

            const response = await applyLeave(formData);   
            setLoading(false)

            if (response.data?.success) {
                const newLeave = response.data?.leave;
                toast.success(response.data.message)
                
                setFormData({
                    employeeId: '',
                    startDate: '',
                    endDate: '',
                    reason: '',
                });
                onLeaveSet(newLeave);
            } else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Error setting leave:', error);
            toast.error('An unexpected error occurred while processing your request.');
        }
    };

    return (
        <>
        {!loading
            ?
        <form onSubmit={handleSubmit}>
            <div className="mt-5 max-w-[40%] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                        Start Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            min={minDate}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                        End Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            min={minDate}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="employeeID" className="block text-sm font-medium leading-6 text-gray-900">
                        Reason
                    </label>
                    <div className="mt-2">
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-x-6">
                <button
                    type='submit'
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Set Leave
                </button>
            </div>
        </form>
            :
            <LoadingSpinner />
        }
        </>
    );
};

export default LeaveForm;