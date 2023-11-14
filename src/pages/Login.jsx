import React from 'react'
import kianPayoutsLogo from '../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='grid place-items-center h-screen bg-gray-200'>
      <div className='p-10 bg-white min-w-[30%] shadow-xl '>
        <img src={kianPayoutsLogo} alt="KianPayouts" className='h-10 mt-5' />
        <h1 className='text-2xl font-semibold mt-6'>Login</h1>
        <h4 className='text-sm'>to access Payouts</h4>
        <form action="">
          <div className=''>
            <div>
              <label htmlFor="email"></label>
              <input className='px-10 py-3 rounded mt-10 min-w-[100%]' type="email" placeholder='Email Address' id='email' required />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input className='px-10 py-3 rounded mt-5 min-w-[100%]' type="password" placeholder='Password' id='password' required />
            </div>
          </div>
          <button className='text-md px-9 py-3 mt-5 bg-blue-500 rounded text-white min-w-[100%] mb-3'>Login</button>
        </form>
        <h4 className='text-md font-medium text-blue-500 text-center pb-5'>Forgot Password?</h4>
      </div>
      <h1 className='self-baseline'>Don't have Payouts account? <button className='font-medium text-blue-500 ' onClick={()=> navigate('/register')}>Sign Up Now</button></h1>
    </div>
  )
}

export default Login;