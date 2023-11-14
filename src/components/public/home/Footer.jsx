import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-100 mt-20'>
            <div className='flex flex-wrap max-w-[35%] h-[20%] text-xs m-auto pt-10 gap-y-3 justify-center divide-x divide-gray-300'>
                <button onClick={()=>navigate('/')} className='px-3'>Home</button>
                <a href='https://kiantechwise.com/about/' className='px-3'>About</a>
                <button onClick={()=>navigate('/features')} className='px-3'>Features</button>
                <button onClick={()=>navigate('/pricing')} className='px-3'>Pricing</button>
                <a href='#AllProducts' className='px-3'>All Products</a>
                <a href="mailto:info@kiantechwise.com" className='px-3'>Support</a>
                <a href='#careers' className='px-3'>Career</a>
                <a href="https://kiantechwise.com/contact-us/" className='px-3'>Contact</a>
                <a href='#terms&condition' className='px-3'>Terms & Conditions</a>
            </div>
            <div className='flex max-w-[60%] justify-center text-xs m-auto pb-20 pt-10 cursor-pointer'>
                <h2>© 2023, Proudly owned by Kian Group Pvt. Ltd. All Rights Reserved.</h2>
            </div>
        </div>
    )
}

export default Footer;