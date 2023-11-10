import React from 'react'

const Demo = () => {
    return (
        <div className='max-w-[80%] bg-violet-100 m-auto mb-14 mt-20'>
            <div className='grid grid-cols-4 items-center mb-6 pt-12'>
                <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Cloud payroll system best suited for Indian businesses</h1>
            </div>
            <div className="m-auto w-[50%] pb-12">
                <div className='grid grid-cols-2 gap-3'>
                    <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                    <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                </div>
            </div>
        </div>
    )
}

export default Demo;