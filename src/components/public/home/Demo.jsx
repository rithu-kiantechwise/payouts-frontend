import React from 'react'
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import { useDispatch } from 'react-redux';

const Demo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='text-center max-w-[90%] lg:max-w-[80%] m-auto mt-10 lg:mt-20'>
            <div className='bg-violet-100 grid grid-cols-1 gap-2 p-8'>
                <div className='grid grid-cols-1'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>Say goodbye to manual complexities and embrace a hassle-free payroll experience.</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-[80%] mt-10 m-auto gap-4">
                    <button onClick={() => navigate('/organization/register')} className='uppercase p-4 rounded text-white font-bold bg-violet-500'>Access payouts</button>
                    <button onClick={() => triggerModal()} className='uppercase p-4 rounded border border-black'>Start a free trial</button>
                </div>
            </div>
        </div>
    )
}

export default Demo;