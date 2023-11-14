import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate();
    return (
        <div className='mt-10'>
            <div className='grid grid-cols-1 text-center m-auto mb-10'>
                <h1 className='text-4xl font-semibold mb-4'>Simple pricing. Extensive features.</h1>
                <h4 className='text-lg'>Online payroll software that is easily affordable.</h4>
            </div>
            <div className="max-w-[90%] m-auto mb-5">
                <div className='grid grid-cols-4'>
                    <div className='col-span-1 col-start-2'>
                        <div className="bg-violet-500 text-center px-10 py-4 my-2">
                            <div className="text-white mb-10">
                                <div className='mt-20 mb-4'>
                                    <sup className="text-4xl font-medium">₹&nbsp;</sup>
                                    <span className="text-7xl font-semibold">50</span>
                                </div>
                                <p className="text-base mb-2">/employee/month</p>
                                <h6 className='text-sm text-gray-200'>Billed Annually</h6>
                            </div>
                            <div>
                                <button onClick={()=> navigate('/register')} className="px-7 py-3 text-black font-bold bg-white rounded mb-20">
                                    GET KIAN PAYOUTS
                                </button>
                            </div>
                            <div className="text-gray-200 text-sm">Minimum 20 Employees</div>
                        </div>
                    </div>
                    <div className='grid col-span-1 col-start-3 items-center m-auto min-h-[100%] px-8 py-4 align-middle border-t-4 border-t-violet-500 min-w-[100%] shadow-xl'>
                        <div className='flex flex-col justify-center leading-[3rem] min-h-[100%]'>
                            <h4>&#10003;&nbsp; Automatic payroll calculation</h4>
                            <h4>&#10003;&nbsp; Direct deposit of salaries</h4>
                            <h4>&#10003;&nbsp; Payroll reports</h4>
                            <h4>&#10003;&nbsp; Statutory compliance</h4>
                            <h4>&#10003;&nbsp; HR integration</h4>
                            <h4>&#10003;&nbsp; Accounting integration</h4>
                            <h4>&#10003;&nbsp; Employee self-service</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;