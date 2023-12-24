import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-100 mt-10 lg:mt-20'>
            <div className='flex flex-wrap md:max-w-[30%] h-[10%] text-xs m-auto p-10 gap-y-3 justify-center divide-x divide-gray-300'>
                <button onClick={()=>navigate('/features')} className='px-3'>Features</button>
                <button onClick={()=>navigate('/pricing')} className='px-3'>Pricing</button>
                <a href="mailto:info@kiantechwise.com" className='px-3'>Support</a>
                <a href='#careers' className='px-3'>Career</a>
                <a href="https://kiantechwise.com/contact-us/" className='px-3'>Contact</a>
                <a href='#terms&condition' className='px-3'>Terms & Conditions</a>
            </div>
            <div className='flex md:max-w-[60%] justify-center text-center text-xs m-auto pb-10 cursor-pointer'>
                <h2>© 2023 - 2024 | Proudly owned by <a className='text-violet-800 font-medium' href="https://kiantechwise.com/">Kian Group</a> | All Rights Reserved.</h2>
            </div>
        </div>
    )
}

export default Footer;