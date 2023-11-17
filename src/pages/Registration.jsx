import React from 'react'
import kianPayoutsLogo from '../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const navigate = useNavigate();


  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:max-w-[80%] max-w-[90%] gap-10 mt-10 m-auto p-6'>
        <div className=''>
          <img src={kianPayoutsLogo} alt="KianPayouts" className='h-10' />
          <h4 className='mt-6'>Kian Payouts is online payouts software that helps businesses in India manage their payouts operations and pay employees on time.</h4>
          <h2 className='mt-10'>We built Kian payouts so you can:</h2>
          <div className='leading-[2.5rem]'>
            <p>&#9679; Streamline your payouts process end-to-end</p>
            <p>&#9679; Define clear roles for your payouts staff</p>
            <p>&#9679; Create salary components, allowances and more, the way you want</p>
            <p>&#9679; Compute your employees' paycheck accurately every time</p>
            <p>&#9679; Distribute salaries and payslips online</p>
            <p>&#9679; Automatic payouts accounting with Kian Books</p>
            <p>&#9679; Reduce payouts staff workload with collaborative self-service portal</p>
          </div>
        </div>
        <div className='text-center'>
          <div className='p-8 border-t-4 border-violet-500 shadow-xl rounded'>
            <h1 className='text-3xl'>Let's get Started</h1>
            <h4 className='mt-2'>Explore all the features with a 14-day free trial</h4>
            <form className='overflow-hidden' action="">
              <div className=''>
                <label htmlFor=""></label>
                <input className='border-transparent px-8 py-2 my-1 min-w-[100%] mt-8 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2 ' type="text" placeholder='Company Name' />
              </div>
              <div>
                <label htmlFor=""></label>
                <input className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2 ' type="text" placeholder='Email' />
              </div>
              <div>
                <label htmlFor=""></label>
                <input className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2 ' type="text" placeholder='Phone Number' />
              </div>
              <div>
                <label htmlFor=""></label>
                <input className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2 ' type="text" placeholder='Password' />
              </div>
              <div>
                <label htmlFor=""></label>
                <input className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2 ' type="text" placeholder='Location' />
              </div>
              <h6 className='text-sm mt-5'>Your data will be in INDIA data center.</h6>
              <div className='mt-5'>
                <input type="checkbox" className='rounded' />
                <label htmlFor="" className='text-sm p-2'>I agree to the <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>.</label>
              </div>
              <button className='text-lg bg-violet-500 text-white uppercase rounded-3xl lg:px-20 px-10 py-2 mt-10'>Sign up now</button>
            </form>
          </div>
          <h2 className='mt-4'>Already have an account? <button className='text-blue-600 font-medium' onClick={() => navigate('/login')}>Sign in</button></h2>
        </div>
      </div>
    </div>
  )
}

export default Registration;