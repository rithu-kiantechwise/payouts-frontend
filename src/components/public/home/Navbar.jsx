import React from 'react'
import PayoutsLogo from '../../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='px-12 bg-gradient-to-b from-violet-100'>
      <div className='flex justify-evenly py-12'>
        <div className='max-w-[10%]'>
          <img className='max-w-[100%] h-auto' src={PayoutsLogo} alt="" />
        </div>
        <div className='flex gap-10 min-w-[70%] justify-end'>
          <button onClick={() => navigate('/features')}>Features</button>
          <button onClick={() => navigate('/pricing')}>Pricing</button>
          <button onClick={() => navigate('/integrations')}>Integration</button>
          <button onClick={() => navigate('/help')}>Help</button>
          <button className='border border-black rounded px-6 py-1'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;