import React, { useState } from 'react'
import { employeeCheckout, sendOTP, verifyOTP } from '../../../api/EmployeeApi';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../LoadingSpinner';

const Attendance = () => {
    const [showInput, setShowInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [newOtp, setNewOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckIn = async () => {
        setLoading(true);
        const response = await sendOTP();
        setLoading(false);
        if (response.data.success) {
            toast.success(response.data.message)
            setNewOtp(response.data.otp)
            setShowInput(true);
        } else {
            toast.error(response.data.message)
        }
        console.log(response.data);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const newOtpString = String(newOtp);
        if (otp === newOtpString) {
            setLoading(true);
            const response = await verifyOTP();
            setLoading(false);
            setOtp('')
            if (response.data.success) {
                toast.success(response.data.message)
                setShowInput(false);
            } else {
                toast.error(response.data.message)
            }
        } else {
            toast.error('Invalid OTP')
        }
    };

    const handleCheckOut = async () => {
        setLoading(true);
        const response = await employeeCheckout();
        setLoading(false);
        if (response.data.success) {
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }
    };

    return (
        <>
            {!loading
                ?
                <div className='p-4'>
                    <h1 className='text-2xl font-semibold'>Attendance</h1>
                    <div className='p-2'>
                        {showInput && (
                            <>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className='rounded' />
                                <button
                                    onClick={handleVerifyOtp}
                                    className='px-4 py-2 border rounded ml-2'>
                                    Verify
                                </button>
                            </>
                        )}
                    </div>
                    <div className='p-2'>
                            <button
                                onClick={handleCheckIn}
                                className='px-4 py-2 bg-green-500 text-white font-medium rounded'>
                                CheckIn
                            </button>
                            <button
                                onClick={handleCheckOut}
                                className='px-4 py-2 bg-red-500 text-white font-medium rounded ml-2'>
                                CheckOut
                            </button>
                    </div>
                </div>
                :
                <LoadingSpinner />
            }
        </>
    )
}

export default Attendance;