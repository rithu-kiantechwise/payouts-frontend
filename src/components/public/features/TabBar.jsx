import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='max-w-[80%] m-auto'>
            <div className='mt-10 md:mt-20'>
                <h1 className='text-2xl grid grid-cols text-center font-bold'>Features that make payouts easy</h1>
            </div>
            <div className=' '>
                <div className='grid grid-cols-6 m-auto text-center border mt-10'>
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
                        Automatic&nbsp;Compliance and Reporting
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