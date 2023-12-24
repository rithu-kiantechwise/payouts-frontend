import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';

const Enroll = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='lg:max-w-[70%] max-w-[90%] bg-violet-500 m-auto mt-20 rounded'>
            <div className='grid grid-cols-4'>
                <h1 className='text-4xl font-bold col-span-4 text-white p-8'>Say goodbye to manual complexities and embrace a hassle-free payroll experience.</h1>
            </div>
            <div className="px-8 pb-8">
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    <button onClick={() => navigate('/register')} className='lg:col-span-1 uppercase p-3 rounded text-black font-bold bg-white '>Access payouts</button>
                    <button onClick={() => triggerModal()} className='lg:col-span-1 uppercase p-3 rounded border text-white border-white '>Start a free trial</button>
                </div>
            </div>
        </div>
    )
}

export default Enroll;