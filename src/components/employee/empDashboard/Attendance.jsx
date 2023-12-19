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
                <div className='mx-auto text-center p-5'>
                    <div className='max-w-[50%] mx-auto border bg-slate-50 rounded p-6'>
                        <div className='mx-auto'>
                            {showInput ?
                                <>
                                <h2 className='pb-5 text-lg mt-5'>Verify the otp to mark your attendance</h2>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className='rounded mt-5 mb-10' />
                                    <button
                                        onClick={handleVerifyOtp}
                                        className='px-6 py-2 border font-medium rounded ml-2 hover:text-violet-800'>
                                        Verify
                                    </button>
                                </>
                                :
                                <div className='mx-auto'>
                                    <h2 className='mt-2 font-medium'>Let's get to work ✍️</h2>
                                    <button
                                        onClick={handleCheckIn}
                                        className='min-w-[60%] py-2 mt-5 bg-green-500 text-white font-medium rounded'>
                                        CheckIn
                                    </button>
                                    <h4 className='mt-2 font-medium'>Your hours will be calculated here.</h4>
                                    <button
                                        onClick={handleCheckOut}
                                        className='min-w-[60%] py-2 mt-5 bg-red-500 text-white font-medium rounded ml-2'>
                                        CheckOut
                                    </button>
                                    <h2 className='mt-2 font-medium'>Don't forget to checkout</h2>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                :
                <LoadingSpinner />
            }
        </>
    )
}

export default Attendance;