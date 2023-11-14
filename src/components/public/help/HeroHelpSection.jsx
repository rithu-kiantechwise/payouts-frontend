import React from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/modalSlice';
import HeroHelpImage from '../../../assets/bannerhelp.webp'

const HeroHelpSection = () => {
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='bg-violet-500 rounded pt-10 pb-20 mt-10'>
            <div className='grid grid-cols-5'>
                <div className='col-span-3'>
                    <img src={HeroHelpImage} alt="HelpHeroBanner" />
                </div>
                <div className='col-span-2 max-w-[80%] m-auto p-10'>
                    <h1 className='text-4xl text-white leading-[3rem]'>See Kian Payouts in Action!</h1>
                    <button onClick={() => triggerModal()} className='px-5 py-3 mt-8 font-semibold bg-yellow-300 rounded'>Get the Trial Access</button>
                </div>
            </div>
        </div>
    )
}

export default HeroHelpSection;