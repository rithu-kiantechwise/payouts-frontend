import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { orgFreeTrialRegister, sendOTP } from '../../api/OrganizationApi';

const DemoModal = () => {
    const dispatch = useDispatch();
    const [newOtp, setNewOtp] = useState('');
    const [showVerifySection, setShowVerifySection] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        location: '',
        otp: '',
    });
    const triggerModal = () => {
        dispatch(closeModal());
    };

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setSignupData({
                ...signupData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };
    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await sendOTP(signupData);
            console.log(response);
            if (response.data.success) {
                toast.success(response.data.message);
                setNewOtp(response.data.otp)
                setShowVerifySection(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error('Sending OTP failed:', err);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const newOtpString = String(newOtp);
            if (signupData.otp === newOtpString) {
                toast.success('Email verification successfull')
                setShowVerifySection(true);
                setIsEmailVerified(true)
            } else {
                toast.error('Invalid OTP')
            }
        } catch (err) {
            console.error('Verification failed:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await orgFreeTrialRegister(signupData);
            if (response.data.success) {
                setSignupData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                    location: '',
                    otp: '',
                })
                toast.success(response.data.message);
                dispatch(closeModal());
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Verification failed:', error);

        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-50 w-1/2 bg-white rounded-lg shadow-lg max-w-fit p-4 sm:p-10 min-w-[90%] sm:min-w-[60%] lg:min-w-[40%]">
                <div className=''>
                    <div className='grid grid-cols-1'>
                        <div className='text-right'>
                            <button type="button" className='text-md font-medium border rounded px-2 py-1' onClick={() => triggerModal(false)}>X</button>
                        </div>
                        <h1 className='text-center text-xl font-medium'>Start a Free Trial</h1>
                        <form onSubmit={handleSubmit} className='m-auto text-center max-w-[100%] overflow-hidden min-w-[100%]'>
                            <div className='my-1 p-2'>
                                <label htmlFor="name"></label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={signupData.name}
                                    required
                                    onChange={handleChange}
                                    placeholder='Company Name'
                                    className='border-gray-200 rounded min-w-[100%]' />
                            </div>
                            <div className='my-1 p-2'>
                                <label htmlFor="email"></label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={signupData.email}
                                    autoComplete="email"
                                    required
                                    onChange={handleChange}
                                    placeholder='Email'
                                    className='border-gray-200 rounded min-w-[100%]' />
                                {!showVerifySection && (
                                    <button type='button' onClick={handleSendOTP} className="mt-2 font-medium hover:text-violet-800">
                                        Send OTP
                                    </button>
                                )}
                            </div>
                            {showVerifySection && (
                                <div className="my-1 p-2 flex gap-4">
                                    <label htmlFor="otp"></label>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        placeholder="Enter OTP"
                                        required
                                        value={signupData.otp}
                                        onChange={handleChange}
                                        className="border-gray-200 rounded"
                                    />
                                    <button onClick={handleVerifyOTP} className="font-medium hover:text-violet-800">
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                            <div className='my-1 p-2'>
                                <label htmlFor="phoneNumber"></label>
                                <input
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    type="number"
                                    placeholder='Phone Number'
                                    value={signupData.phoneNumber}
                                    required
                                    onChange={handleChange}
                                    className='border-gray-200 rounded min-w-[100%]' />
                            </div>
                            <div className='my-1 p-2'>
                                <label htmlFor="password"></label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={signupData.password}
                                    required
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className='border-gray-200 rounded min-w-[100%]' />
                            </div>
                            <div className='my-1 p-2'>
                                <label htmlFor="location"></label>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={signupData.location}
                                    required
                                    onChange={handleChange}
                                    placeholder='Location'
                                    className='border-gray-200 rounded min-w-[100%]' />
                            </div>
                            {/* <div className='my-1 p-2 flex flex-col'>
                                    <div className='flex justify-start gap-4'>
                                        <input className='max-w-[60%] border-gray-200 rounded py-4 mb-2' value={'CH4RHG'} type="text" disabled />
                                        <button className='text-5xl font-extralight'>&#8635;</button>
                                    </div>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='Enter the Captcha' />
                                </div> */}

                            <button
                                disabled={!isEmailVerified}
                                className='bg-violet-500 font-medium text-white px-10 py-3 rounded mt-2'>
                                Start Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemoModal;