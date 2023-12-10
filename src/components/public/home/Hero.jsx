import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const triggerModal = () => {
    dispatch(openModal());
  }

  return (
    <div className='lg:max-w-[80%] m-auto text-center mt-10 mb-10'>
      <div className='grid grid-cols-1 p-4 sm:p-10'>
        <div className='grid grid-cols-1 items-center'>
          <h1 className='text-center text-4xl font-bold mb-4'>Payouts software crafted to build a better workplace</h1>
          <p className='text-center text-lg'>With the simplified payouts software, spend less time on payouts and more time on growing business.</p>
        </div>
        <div className='grid grid-cols-2 gap-3 max-w-[90%] lg:max-w-[80%] m-auto mt-10'>
          <button onClick={() => navigate('/organization/register')} className='lg:col-span-1 col-span-2 uppercase p-4 rounded text-white font-bold bg-violet-500'>Access kian payouts</button>
          <button onClick={() => triggerModal(true)} className=' lg:col-span-1 col-span-2 uppercase p-4 rounded border border-black'>Start a free trial</button>
        </div>
      </div>
    </div>
  )
}

export default Hero;