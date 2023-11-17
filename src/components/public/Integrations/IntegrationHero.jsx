import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';

const IntegrationHero = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='max-w-[90%] lg:max-w-[70%] bg-violet-600 m-auto mt-10 lg:mt-20 rounded'>
            <div className='grid grid-cols-1'>
                <h1 className='text-3xl leading-[3rem] font-medium text-white p-8'>Enjoy seamless accounting, banking, and HRMS solutions with Kian Payouts integrations</h1>
            </div>
            <div className="max-w-[90%] px-8 pb-8">
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                    <button onClick={() => triggerModal()} className='lg:col-span-2 p-3 uppercase rounded text-white font-bold bg-gradient-to-r from-blue-500 to-cyan-500'>Explore kian payouts for free trail</button>
                    <button onClick={() => navigate('/register')} className='lg:col-span-1 p-3 uppercase rounded border text-white border-white '>Access Kian Payouts</button>
                </div>
            </div>
        </div>
    )
}

export default IntegrationHero;