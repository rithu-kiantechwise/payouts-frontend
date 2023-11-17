import React from 'react'

const Customer = () => {
    return (
        <div className='w-full bg-violet-100 mt-20 py-10'>
            <div className='grid grid-cols-1 items-center max-w-[90%] sm:max-w-[80%] m-auto text-4xl'>
                <h1 className='text-center font-semibold'>Our customers had</h1>
                <h1 className='text-center font-semibold'>smooth transitions, sweeping impacts</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center max-w-[90%] sm:max-w-[80%] m-auto mt-10 md:mt-20 sm:divide-x-2 sm:divide-violet-200'>
                <div className='p-5'>
                    <h1 className='text-4xl font-bold text-violet-800'>90%</h1>
                    <h4 className='text-left'>of Kian Payouts customers switched from spreadsheets to cloud-based payouts software.</h4>
                </div>
                <div className='p-5'>
                    <h1 className='text-4xl font-bold text-violet-800'>70%</h1>
                    <h4 className='text-left'>of operations time saved by customers on average after using Kian Payouts.</h4>
                </div>
                <div className='p-5'>
                    <h1 className='text-4xl font-bold text-violet-800'>4/5</h1>
                    <h4 className='text-left'>customers enjoyed hassle-free migration to Kian Payouts, even in the middle of the fiscal year.</h4>
                </div>
                <div className='p-5'>
                    <h1 className='text-4xl font-bold text-violet-800'>90%</h1>
                    <h4 className='text-left'>of our customers eliminate multi-vendor coordination through our pre-integrated apps.</h4>
                </div>
            </div>
        </div>
    )
}

export default Customer;