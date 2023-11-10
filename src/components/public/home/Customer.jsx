import React from 'react'

const Customer = () => {
    return (
        <div className='flex justify-center w-full bg-violet-100'>
            <div className='items-center mt-20'>
                <div className='grid grid-cols-4 items-center text-4xl'>
                    <h1 className='text-center font-bold col-span-4'>Our customers had</h1>
                    <h1 className='text-center font-bold col-span-4'>smooth transitions, sweeping impacts</h1>
                </div>
                <div className='grid grid-cols-4 items-center max-w-[80%] m-auto mt-20 mb-20 divide-x-2 divide-violet-200'>
                    <div className='px-5'>
                        <h1 className='text-4xl font-bold text-violet-800'>90%</h1>
                        <h4 className='text-left'>of Zoho Payroll customers switched from spreadsheets to cloud-based payroll software.</h4>
                    </div>
                    <div className='px-5'>
                        <h1 className='text-4xl font-bold text-violet-800'>70%</h1>
                        <h4 className='text-left'>of operations time saved by customers on average after using Zoho Payroll.</h4>
                    </div>
                    <div className='px-5'>
                        <h1 className='text-4xl font-bold text-violet-800'>4/5</h1>
                        <h4 className='text-left'>customers enjoyed hassle-free migration to Zoho Payroll, even in the middle of the fiscal year.</h4>
                    </div>
                    <div className='px-5'>
                        <h1 className='text-4xl font-bold text-violet-800'>90%</h1>
                        <h4 className='text-left'>of our customers eliminate multi-vendor coordination through our pre-integrated apps.</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customer;