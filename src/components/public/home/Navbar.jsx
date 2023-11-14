import React from 'react'
import PayoutsLogo from '../../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='px-12 bg-gradient-to-b from-violet-100'>
      <div className='flex justify-evenly py-12'>
        <div className='max-w-[10%]'>
          <img onClick={() => navigate('/')} className='max-w-[100%] h-auto cursor-pointer' src={PayoutsLogo} alt="" />
        </div>
        <div className='flex gap-10 min-w-[70%] justify-end'>
          <button className='hover:text-violet-800 font-medium' onClick={() => navigate('/features')}>Features</button>
          <button className='hover:text-violet-800 font-medium' onClick={() => navigate('/pricing')}>Pricing</button>
          <button className='hover:text-violet-800 font-medium' onClick={() => navigate('/integrations')}>Integration</button>
          <button className='hover:text-violet-800 font-medium' onClick={() => navigate('/help')}>Help</button>
          <button className='border border-black rounded px-6 py-1 font-medium hover:bg-violet-500 hover:text-white hover:border-0' onClick={() => navigate('/login')}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;