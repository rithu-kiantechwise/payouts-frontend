import React from 'react'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';

const DemoModal = () => {
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(closeModal());
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-50 w-1/2 bg-white rounded-lg shadow-lg max-w-fit p-10 min-w-[30%]">
                <div className=''>
                    <div className='grid grid-cols-1'>
                        <div className='text-right'>
                            <button className='text-md font-medium border rounded px-2 py-1' onClick={() => triggerModal(false)}>X</button>
                        </div>
                        <h1 className='text-center text-xl font-medium'>Start a Free Trial</h1>
                        <form action="" className='m-auto text-center min-w-[100%]'>
                            <div>
                                <div className='my-1 p-2'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='Your Full Name' />
                                </div>
                                <div className='my-1 p-2'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='Your Email' />
                                    <button className='mt-2 font-medium'>Send OTP</button>
                                </div>
                                <div className='my-1 p-2'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='Your Phone Number' />
                                    <button className='mt-2 font-medium'>Send OTP</button>
                                </div>
                                <div className='my-1 p-2 flex gap-4'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded' type="text" placeholder='Enter Email OTP' />
                                    <button className='font-medium hover:text-violet-800'>Verify</button>
                                </div>
                                <div className='my-1 p-2 flex gap-4'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded' type="text" placeholder='Enter Mobile OTP' />
                                    <button className='font-medium hover:text-violet-800'>Verify</button>
                                </div>
                                <div className='my-1 p-2'>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='No. of Employees' />
                                </div>
                                <div className='my-1 p-2 flex flex-col'>
                                    <div className='flex justify-start gap-4'>
                                        <input className='max-w-[60%] border-gray-200 rounded py-4 mb-2' value={'CH4RHG'} type="text" disabled />
                                        <button className='text-5xl font-extralight'>&#8635;</button>
                                    </div>
                                    <label htmlFor=""></label>
                                    <input className='border-gray-200 rounded min-w-[100%]' type="text" placeholder='Enter the Captcha' />
                                </div>
                                <button className='bg-violet-500 font-medium text-white px-10 py-3 rounded mt-2'>Start Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemoModal;