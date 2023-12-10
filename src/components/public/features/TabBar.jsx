import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='md:max-w-[80%] lg:max-w-[80%] max-w-[90%] m-auto'>
            <div className='mt-10 md:mt-20'>
                <h1 className='text-2xl grid grid-cols text-center font-bold'>Features that make payouts easy</h1>
            </div>
            <div className='lg:overflow-hidden md:overflow-hidden  overflow-scroll lg:border-0 md:border-0 border lg:mt-0 md:mt-0 mt-5'>
                <div className='lg:min-w--[100%] md:min-w-[100%] min-w-[200%] grid grid-cols-6 m-auto text-center lg:border md:border lg:mt-10 md:mt-10 mt-0 md:text-base lg:text-base text-sm'>
                    <button
                        className={`p-2 ${isActive('/features/employeetab') || isActive('/features') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/employeetab')}>
                        Fast Employee Onboarding
                    </button>
                    <button
                        className={`p-2 ${isActive('/features/administrationtab') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/administrationtab')}>
                        Powerful Administration
                    </button>
                    <button
                        className={`p-2 ${isActive('/features/payrolltab') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/payrolltab')}>
                        Effortless Payouts Processing
                    </button>
                    <button
                        className={`p-2 ${isActive('/features/portaltab') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/portaltab')}>
                        Secured Employee Self Service Portal
                    </button>
                    <button
                        className={`p-2 ${isActive('/features/compiliancetab') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/compiliancetab')}>
                        Automatic Compliance and Reporting
                    </button>
                    <button
                        className={`p-2 ${isActive('/features/benefitstab') ? 'border-b-4 font-semibold border-b-violet-500 ' : ''} border-b-4 border-transparent hover:font-semibold hover:border-violet-500`}
                        onClick={() => navigate('/features/benefitstab')}>
                        Benefits Administration
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TabBar;