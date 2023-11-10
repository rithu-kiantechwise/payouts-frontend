import React from 'react'

const IntegrationHero = () => {
    return (
        <div className='max-w-[70%] bg-violet-600 m-auto mt-20 rounded'>
            <div className='grid grid-cols-4'>
                <h1 className='text-3xl leading-[3rem] font-medium col-span-4 text-white p-8'>Enjoy seamless accounting, banking, and HRMS solutions with Kian Payroll integrations</h1>
            </div>
            <div className="max-w-[70%] px-8 pb-8">
                <div className='grid grid-cols-3 gap-3'>
                    <button className='lg:col-span-2 col-span-2 py-3 uppercase rounded text-white font-bold bg-gradient-to-r from-blue-500 to-cyan-500'>Explore kian payouts for free trail</button>
                    <button className='lg:col-span-1 col-span-2 py-3 uppercase rounded border text-white border-white '>Access kian payouts</button>
                </div>
            </div>
        </div>
    )
}

export default IntegrationHero;