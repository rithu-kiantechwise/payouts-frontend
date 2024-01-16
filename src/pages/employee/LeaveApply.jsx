import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { applyLeave, cancelLeave, fetchLeaveDetails, updateLeave } from '../../api/EmployeeApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/employee/empDashboard/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const LeaveApply = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        startTime: '00:00',
        endDate: '',
        endTime: '00:00',
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
    useEffect(() => {
        const leaveId = location.state?.leaveId;
        if (leaveId) {
            const getLeaveDetails = async () => {
                try {
                    setLoading(true);
                    const response = await fetchLeaveDetails({ leaveId });
                    setLoading(false);
                    if (response.data?.success) {
                        const leaveData = response.data.leave;
                        setFormData({
                            ...leaveData,
                            startDate: leaveData.startDate.split('T')[0],
                            endDate: leaveData.endDate.split('T')[0],
                        });
                    } else {
                        toast.error(response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching leave details:', error);
                    toast.error('An unexpected error occurred while fetching leave details.');
                }
            };
            getLeaveDetails();
        }
    }, [location.state?.leaveId]);

    const handleCancel = async (e) => {
        e.preventDefault();
        try {
            MySwal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Cancel it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    MySwal.fire({
                        title: "Cancelling...",
                        icon: "info",
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                    try {
                        const leaveId = formData._id;
                        setLoading(true);
                        const response = await cancelLeave({ leaveId });
                        setLoading(false);

                        if (response.data?.success) {
                            MySwal.fire({
                                title: "Cancelled!",
                                text: response.data.message,
                                icon: "success",
                            });
                            navigate('/employee/leave-calendar');
                        } else {
                            MySwal.fire({
                                title: "Already Cancelled",
                                text: response.data.message || 'An unexpected error occurred',
                                icon: "warning",
                            });
                        }
                    } catch (error) {
                        console.error('Error cancelling leave:', error);
                        toast.error('An unexpected error occurred while cancelling leave.');
                    }
                }
            });
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = location.state?.leaveId
                ? await updateLeave(formData)
                : await applyLeave(formData);
            setLoading(false);

            if (response.data?.success) {
                toast.success(response.data.message);
                navigate('/employee/leave-calendar');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error setting leave:', error);
            toast.error('An unexpected error occurred while processing your request.');
        }
    };

    return (
        <div className='flex min-h-[100vh]'>
            <Sidebar />
            <div className='mx-auto min-w-[80%] p-8'>
                {!loading
                    ?
                    <div>
                        <h1 className='text-2xl font-semibold'>Leave Application</h1>
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
                                    <label htmlFor="startTime" className="block text-sm font-medium leading-6 text-gray-900">
                                        Start Time
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="endTime" className="block text-sm font-medium leading-6 text-gray-900">
                                        End Time
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleChange}
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
                                {location.state?.leaveId ?
                                    <button
                                        onClick={handleCancel}
                                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                        {location.state?.leaveId ? 'Cancel Leave' : ''}
                                    </button>
                                    : ''
                                }
                                <button
                                    type='submit'
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    {location.state?.leaveId ? 'Update Leave' : 'Set Leave'}
                                </button>
                            </div>
                        </form>
                    </div>
                    :
                    <LoadingSpinner />
                }
            </div>
        </div>
    );
};

export default LeaveApply;