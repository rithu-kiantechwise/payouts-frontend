import React from 'react'

const Enroll = () => {
    return (
        <div className='max-w-[70%] bg-violet-500 m-auto mt-20 rounded'>
            <div className='grid grid-cols-4'>
                <h1 className='text-4xl font-bold col-span-4 text-white p-8'>Payroll made in India, made for Indian businesses</h1>
            </div>
            <div className="w-[60%] px-8 pb-8">
                <div className='grid grid-cols-2 gap-3'>
                    <button className='lg:col-span-1 col-span-2 uppercase px-8 py-3 rounded text-black font-bold bg-white '>Access kian payouts</button>
                    <button className='lg:col-span-1 col-span-2 uppercase px-8 py-3 rounded border text-white border-white '>Start a free trial</button>
                </div>
            </div>
        </div>
    )
}

export default Enroll;