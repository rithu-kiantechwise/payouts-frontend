import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import kianPayoutsLogo from '../../assets/payoutsLogo.png'
import { empForgotPassword, empResetPassword } from '../../api/EmployeeApi';
import LoadingSpinner from '../../components/LoadingSpinner';

const EmpForgotPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        otp: '',
        newPassword: '',
    });
    const [newOtp, setNewOtp] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setData({
                ...data,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    }
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)

            const response = await empForgotPassword(data)
            setLoading(false)

            if (response.data.success) {
                console.log(response.data);
                setNewOtp(response.data.otp)
                toast.success(response.data.message)
                setError('')
                setStep(2);
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error(err);
            setError('Failed to send OTP. Please try again.');
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const newOtpString = String(newOtp);
            if (data?.otp === newOtpString) {
                setStep(3)
            }
            else {
                toast.error('Invalid OTP')
            }
        } catch (err) {
            console.error(err);
            setError('OTP verification failed. Please try again.');
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)

            const response = await empResetPassword(data)
            setLoading(false)

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/employee/login')
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.error(err);
            setError('Failed to reset password. Please try again.');
        }
    }

    return (
        <>
            {!loading
                ?
                <div className="mx-auto bg-gray-200">
                    <div className='grid grid-cols-1 place-items-center h-screen'>
                        <div className='p-10 bg-white min-w-[30%] shadow-xl'>
                            <img src={kianPayoutsLogo} alt="KianPayouts" className='h-10 mt-5 mx-auto' />
                            <h1 className='text-2xl text-center font-semibold mt-6'>Forgot Password</h1>
                            {step === 1 && (
                                <form onSubmit={handleForgotPassword}>
                                    <div>
                                        <label htmlFor="email"></label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            autoComplete="email"
                                            required
                                            onChange={handleChange}
                                            placeholder='Enter your Email Address'
                                            className='px-10 py-3 rounded mt-10 min-w-[100%]' />
                                    </div>
                                    <div>
                                        {error && <p className='text-red-500'>{error}</p>}
                                    </div>
                                    <div className='text-center'>
                                        <button className='text-md py-3 mt-5 bg-blue-500 rounded text-white min-w-[80%] mx-auto mb-3'>Send OTP</button>
                                    </div>
                                </form>
                            )}
                            {step === 2 && (
                                <form onSubmit={handleVerifyOtp}>
                                    <div>
                                        <label htmlFor="otp"></label>
                                        <input
                                            id="otp"
                                            name="otp"
                                            type="number"
                                            required
                                            value={data.otp}
                                            onChange={handleChange}
                                            placeholder='Enter OTP'
                                            className='px-10 py-3 rounded mt-10 min-w-[100%]' />
                                    </div>
                                    <div>
                                        {error && <p className='text-red-500'>{error}</p>}
                                    </div>
                                    <div className='text-center'>
                                        <button className='text-md py-3 mt-5 bg-blue-500 rounded text-white min-w-[80%] mx-auto mb-3'>Verify OTP</button>
                                    </div>
                                </form>
                            )}
                            {step === 3 && (
                                <form onSubmit={handleResetPassword}>
                                    <div>
                                        <label htmlFor="password"></label>
                                        <input
                                            id="password"
                                            name="newPassword"
                                            type="password"
                                            required
                                            value={data.newPassword}
                                            onChange={handleChange}
                                            placeholder='New Password'
                                            className='px-10 py-3 rounded mt-10 min-w-[100%]' />
                                    </div>
                                    <div>
                                        {error && <p className='text-red-500'>{error}</p>}
                                    </div>
                                    <div className='text-center'>
                                        <button className='text-md py-3 mt-5 bg-blue-500 rounded text-white min-w-[80%] mx-auto mb-3'>Reset Password</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                :
                <LoadingSpinner />
            }
        </>
    )
}

export default EmpForgotPassword;