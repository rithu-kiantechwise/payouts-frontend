import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-100 mt-20'>
            <div className='flex flex-wrap max-w-[35%] h-[20%] text-xs m-auto pt-10 gap-y-3 justify-center divide-x divide-gray-300'>
                <button className='px-3'>Home</button>
                <button className='px-3'>About</button>
                <button className='px-3'>Features</button>
                <button className='px-3'>Pricing</button>
                <button className='px-3'>All Products</button>
                <button className='px-3'>Support</button>
                <button className='px-3'>Career</button>
                <button className='px-3'>Contact</button>
                <button className='px-3'>Terms & Conditions</button>
            </div>
            <div className='flex max-w-[60%] justify-center text-xs m-auto pb-20 pt-10'>
                <h2>© 2023, Proudly owned by Kian Group Pvt. Ltd. All Rights Reserved.</h2>
            </div>
        </div>
    )
}

export default Footer;