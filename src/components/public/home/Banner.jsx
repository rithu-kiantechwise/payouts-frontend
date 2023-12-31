import React from 'react'
import BannerImage from '../../../assets/homeBannerImg.jpg'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className='max-w-[80%] m-auto mt-10'>
            <div className='outline outline-violet-500'>
                <div className='max-w-[90%] m-auto p-10 md:pt-[4.5rem]'>
                    <h1 className='text-4xl font-semibold text-center'>Payouts: Streamline Payroll Processing with Effortless Precision</h1>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-5 md:p-10 gap-4'>
                    <div className='lg:col-span-2 p-10'>
                        <div className='max-w-[80%] m-auto p-2 border-l-4 border-l-black'>
                            <h4 className='font-extrabold'>Who are we</h4>
                        </div>
                        <div className='max-w-[80%] m-auto'>
                            <h1 className='text-4xl pt-10 font-bold bg-gradient-to-r from-violet-800 to-blue-400 bg-clip-text text-transparent'>Payroll solutions for every business</h1>
                            <h4 className='text-xl pt-6'>Seamlessly automate salary calculations, reimbursements, leave, bonuses, and more.</h4>
                            <button onClick={() => navigate('/organization/register')} className='px-5 py-3 mt-6 rounded-md text-white font-bold text-lg bg-violet-500'>Get Started</button>
                        </div>
                    </div>
                    <div className='lg:col-span-3 h-fit'>
                        <img src={BannerImage} alt="BannerImage" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;