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
    <div className='flex justify-center w-full mt-16 mb-20'>
      <div className='items-center'>
        <div className='grid grid-cols-4 items-center mb-10'>
          <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Payouts software crafted to build a better workplace</h1>
          <p className='text-center text-lg col-start-2 col-end-4 col-span-2'>With the simplified payroll software, spend less time on payroll and more time on growing business.</p>
        </div>
        <div className="m-auto w-[50%]" >
          <div className='grid grid-cols-2 gap-3'>
            <button onClick={() => navigate('/register')} className='lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500'>Access kian payouts</button>
            <button onClick={() => triggerModal(true)} className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black'>Start a free trial</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;