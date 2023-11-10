import React from 'react'
import DashboardImage from '../../../assets/employeeDashImg.png'

const BannerHelp = () => {
  return (
    <div className='mt-10'>
        <div className='text-center max-w-[40%] m-auto'>
            <h2 className='text-4xl font-mono font-semibold text-stone-500'>Welcome to</h2>
            <h2 className='text-5xl font-extrabold'>Kian Payouts <span className='text-violet-500'>Help</span></h2>
            <h4 className='max-w-[80%] m-auto mt-6'>We're here to assist you with day-to-day payroll activities, whether you're a payroll admin or employee.</h4>
        </div>
        <div className='mt-10 max-w-[70%] m-auto'>
            <img className='rounded-2xl' src={DashboardImage} alt="DashImageHelp" />
        </div>
    </div>
  )
}

export default BannerHelp;