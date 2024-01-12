import React from 'react'
import noProfile from '../../assets/noprofile.jpg'
import payoutsLogo from '../../assets/payoutsLogo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/userSlice'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const isActive = (path) => {
        return location.pathname === path;
    };
    const logoutFunction = () => {
        localStorage.removeItem('organizationToken');
        localStorage.removeItem('refreshToken');
        dispatch(logoutUser());
        navigate('/organization/login');
    }

    return (
        <div>
            <div className="flex flex-col w-64 min-h-[100%] px-4 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-gray-900 border-gray-700">
                <button
                    onClick={() => navigate('/')}
                    className="mx-auto">
                    <img className="w-auto h-6 sm:h-7" src={payoutsLogo} alt="" />
                </button>

                <Link to={'/organization/organization-profile'} className='flex flex-col items-center mt-6 -mx-2'>
                    {
                        user?.imageUrl
                            ?
                            <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={user?.imageUrl} alt="avatar" />
                            :
                            <img className="object-cover w-28 h-28 mx-2 rounded-full cursor-pointer" src={noProfile} alt="avatar" />
                    }
                    <h4 className="mx-2 mt-2 font-medium text-gray-200">{user?.name}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-400">{user?.email}</p>
                </Link>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <Link to={'/organization/dashboard'} className={`flex mt-6 items-center px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200 ${isActive('/organization/dashboard') ? 'bg-gray-800 text-gray-200' : 'text-gray-400'}`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Dashboard</span>
                        </Link>

                        <Link to={'/organization/employee-attendance'} className={`flex mt-6 items-center px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200 ${isActive('/organization/employee-attendance') ? 'bg-gray-800 text-gray-200' : 'text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span className="mx-4 font-medium">Attendance</span>
                        </Link>

                        <Link to={'/organization/employee-details'} className={`flex mt-6 items-center px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200 ${isActive('/organization/employee-details') ? 'bg-gray-800 text-gray-200' : 'text-gray-400'}`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Employee Details</span>
                        </Link>

                        <Link to={'/organization/employee-tax'} className={`flex mt-6 items-center px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200 ${isActive('/organization/employee-tax') ? 'bg-gray-800 text-gray-200' : 'text-gray-400'}`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Taxation</span>
                        </Link>

                        <button
                            onClick={logoutFunction}
                            className="flex items-center min-w-full px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Logout</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;