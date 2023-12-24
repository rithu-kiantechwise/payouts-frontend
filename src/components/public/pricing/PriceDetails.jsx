import React from 'react'

const PriceDetails = () => {
    return (
        <div className='container m-auto mt-10'>
            <div className='max-w-[90%] m-auto'>
                <h1 className='text-2xl md:text-5xl text-center font-medium'>Affordable pricing, comprehensive features</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 max-w-[90%] md:max-w-[80%] lg:max-w-[70%] gap-4 m-auto mt-10 md:mt-20'>
                <div className='border text-center'>
                    <div className='p-5'>
                        <h1 className='text-lg font-bold uppercase mt-10'>F r e e</h1>
                        <div className='max-w-[40%] m-auto mt-5'>
                            <svg viewBox="0 0 270 270" class="free-plan-img" alt="Gift Box">
                                <path d="M127.1 85.2L90 75.5c-4.6-1.2-8.3-4.3-10.2-8.7-1.8-4.1-1.7-8.7.3-12.7.2-.3.3-.6.5-.9 2.4-4 6.6-6.7 11.4-7.2 4.3-.5 8.6 1.1 11.9 4.2l27.5 26.6-1.4 1.4-27.5-26.6c-2.9-2.8-6.6-4.1-10.3-3.7-4.2.5-7.8 2.8-9.9 6.4-.2.3-.3.5-.4.8-1.7 3.4-1.8 7.4-.2 10.9 1.7 3.8 4.9 6.5 8.9 7.5l37.1 9.7-.6 2zM143.8 84.2l-.5-1.9 37.1-9.7c4-1 7.2-3.8 8.9-7.5 1.6-3.6 1.5-7.5-.2-10.9-.1-.3-.3-.5-.4-.8-2.2-3.6-5.8-5.9-9.9-6.4-3.7-.4-7.4.9-10.3 3.7L141 77.3l-1.4-1.4L167 49.2c3.3-3.2 7.6-4.7 11.9-4.2 4.8.5 8.9 3.2 11.4 7.3.2.3.4.6.5.9 2 3.9 2.1 8.5.3 12.7-1.9 4.3-5.7 7.5-10.2 8.7l-37.1 9.6z"></path>
                                <ellipse opacity=".05" cx="136.5" cy="251.7" rx="112.3" ry="9"></ellipse>
                                <path fill="#FFF" d="M56 108.6h158.1v119.5H56z"></path>
                                <path d="M215.1 229H55V107.6h160.1V229zM57 227h156.1V109.6H57V227z"></path>
                                <path fill="#FFF" d="M52.3 83.6h165.8V110H52.3z"></path>
                                <path d="M219.1 111H51.3V82.6h167.8V111zm-165.8-2h163.8V84.6H53.3V109z"></path>
                                <path fill="#8b5cf6" d="M121.7 84.3h26.1v145h-26.1z"></path>
                                <path fill="#ddd6fe" d="M122.2 66.8h25.7V84h-25.7z"></path>
                                <path d="M148.9 85h-27.7V65.8h27.7V85zm-25.7-2h23.7V67.8h-23.7V83zM228.8 229h-186c-.6 0-1-.4-1-1s.4-1 1-1h186c.6 0 1 .4 1 1s-.4 1-1 1zM36.8 229h-10c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1zM244.8 229h-10c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1zM128.8 145.8c-.6 0-1-.4-1-1v-36c0-.6.4-1 1-1s1 .4 1 1v36c0 .5-.4 1-1 1zM137.8 130.4c-.6 0-1-.4-1-1v-20.7c0-.6.4-1 1-1s1 .4 1 1v20.7c0 .6-.4 1-1 1zM137.8 226.8c-.6 0-1-.4-1-1v-30.3c0-.6.4-1 1-1s1 .4 1 1v30.3c0 .5-.4 1-1 1zM128.8 226.8c-.6 0-1-.4-1-1v-17.4c0-.6.4-1 1-1s1 .4 1 1v17.4c0 .5-.4 1-1 1z"></path>
                                <path fill="#EDF7F0" d="M85.6 182.4l-5.4-1.5-5.4 1.7 1.6-5.5-1.7-5.3 5.4 1.5 5.4-1.7-1.5 5.5z"></path>
                                <path opacity=".46" fill="#EDF7F0" d="M196.6 202.4l-5.4-1.5-5.4 1.7 1.6-5.5-1.7-5.3 5.4 1.5 5.4-1.7-1.5 5.5z"></path>
                                <path fill="#EDF7F0" d="M185.6 131.4l-2.7-.7-2.7.8.8-2.7-.8-2.7 2.7.8 2.7-.9-.8 2.7z"></path>
                                <path opacity=".5" fill="#EDF7F0" d="M79.6 96.4l-2.7-.7-2.7.8.8-2.7-.8-2.7 2.7.8 2.7-.9-.8 2.7z"></path>
                                <path d="M147.9 27.9l-2.8-6.5-6.5-2.8 6.5-2.8 2.8-6.5 2.8 6.5 6.5 2.8-6.5 2.8-2.8 6.5zm-6.8-9.3l4.7 2.1 2.1 4.7 2.1-4.7 4.7-2.1-4.7-2.1-2.1-4.7-2.1 4.7-4.7 2.1zM24.2 92l-2.6-5.9-5.9-2.6 5.9-2.6 2.6-5.9 2.6 5.9 5.9 2.6-5.9 2.6-2.6 5.9zm-6-8.4l4.1 1.8 1.8 4.1 1.8-4.1 4.1-1.8-4-1.8-1.8-4.1-1.8 4.1-4.2 1.8zM247.8 74.6c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zm0-11.9c-3 0-5.5 2.4-5.5 5.5s2.4 5.5 5.5 5.5 5.5-2.4 5.5-5.5-2.5-5.5-5.5-5.5zM244.8 129.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.5 3.5-3.5 3.5zm0-5.9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM31.8 160.3c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.5 3.5-3.5 3.5zm0-6c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM60.4 40.4c-2.7 0-4.9-2.2-4.9-4.9s2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9-2.2 4.9-4.9 4.9zm0-8.8c-2.2 0-3.9 1.8-3.9 3.9s1.8 3.9 3.9 3.9 3.9-1.8 3.9-3.9-1.8-3.9-3.9-3.9z"></path>
                            </svg>
                        </div>
                        <button className='px-14 py-2 mt-10 border border-violet-800 bg-violet-200 text-violet-500 uppercase font-bold rounded'>Start Now</button>
                        <h4 className='text-sm my-6'>No. of employees: <strong>Minimum 20</strong></h4>
                    </div>
                    <div className='flex flex-col border-t items-start p-8 leading-[2rem] min-h-[100%]'>
                        <h4>&#10003;&nbsp; Free trial for 14 days only.</h4>
                        <h4>&#10003;&nbsp; Work locations: <strong>25</strong></h4>
                        <h4>&#10003;&nbsp; Personalised alerts & reminders</h4>
                        <h4>&#10003;&nbsp; Salary revision with approval</h4>
                        <h4>&#10003;&nbsp; Custom user roles and permissions</h4>
                        <h4>&#10003;&nbsp; Fast onboarding with salary templates</h4>
                        <h4>&#10003;&nbsp; Custom data through custom fields</h4>
                        <div className='mt-10'>
                            <h2 className='font-bold'>Support</h2>
                            <h4>&#10003;&nbsp; Email</h4>
                        </div>
                    </div>
                </div>
                <div className='text-center border'>
                    <div className='border-t-8 border-t-violet-500 p-5'>
                        <h1 className='text-lg font-bold uppercase mt-8'>P r e m i u m &nbsp; P l a n</h1>
                        <div className="lg:py-2 xl:py-6 ">
                            <div className='mt-3'>
                                <sup className="text-4xl font-medium">₹&nbsp;</sup>
                                <span className="text-7xl font-extrabold">50</span>
                            </div>
                            <p className="text-base mb-2">(Per Employee / Monthly)</p>
                            <h6 className='text-sm max-w-[80%] mx-auto'>Billed : 1 Month / 3 Months / 6 Months / 1 Year (Minimum 20 Employees)</h6>
                        </div>
                        <button className='px-14 py-2 bg-violet-500 text-white uppercase font-bold rounded mt-4'>Start Now</button>
                        <h4 className='text-sm my-6'>No. of employees: <strong>Minimum 20</strong></h4>
                    </div>
                    <div className='text-left p-8 border-t leading-[2rem] min-h-[100%]'>
                        <h4>&#10003;&nbsp; Work locations: <strong>25</strong></h4>
                        <h4>&#10003;&nbsp; Personalised alerts & reminders</h4>
                        <h4>&#10003;&nbsp; Salary revision with approval</h4>
                        <h4>&#10003;&nbsp; Custom user roles and permissions</h4>
                        <h4>&#10003;&nbsp; Fast onboarding with salary templates</h4>
                        <h4>&#10003;&nbsp; Custom data through custom fields</h4>
                        <div className='mt-10'>
                            <h2 className='font-bold'>Support</h2>
                            <h4>&#10003;&nbsp; Email</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PriceDetails;