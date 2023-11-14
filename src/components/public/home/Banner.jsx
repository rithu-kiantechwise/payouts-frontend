import React from 'react'
import BannerImage from '../../../assets/homeBannerImg.jpeg'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className='mt-10 p-10'>
            <div className='outline outline-violet-500 p-12'>
                <div className='max-w-[70%] m-auto'>
                    <h1 className='text-5xl font-bold text-center'>The company that leaders trust to help them grow and thrive</h1>
                </div>
                <div className='grid grid-cols-5 mt-16'>
                    <div className='col-span-2 p-10'>
                        <div className='max-w-[80%] m-auto p-2 border-l-4 border-l-black'>
                            <h4 className='font-extrabold'>Who are we</h4>
                        </div>
                        <div className='max-w-[80%] m-auto'>
                            <h1 className='text-4xl pt-10 font-bold bg-gradient-to-r from-violet-800 to-blue-400 bg-clip-text text-transparent'>Payroll solutions for every business</h1>
                            <h4 className='text-xl pt-6'>Proven and best in class: integrated, with silos down, productivity up, and potential unleashed.</h4>
                            <button onClick={() => navigate('/register')} className='px-5 py-3 mt-6 rounded-md text-white font-bold text-lg bg-violet-500'>Get Started with Kian payouts</button>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <img src={BannerImage} alt="BannerImage" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;