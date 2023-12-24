import React, { useState } from 'react'
import KianLogo from '../../assets/logo.png'
import { employeeLogin } from '../../api/EmployeeApi';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const EmployeeLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setLoginData({
                ...loginData,
                [name]: value,
            });
        } catch (error) {
            console.error('Error in handleChange:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!loginData.email || !loginData.password) {
                setError('Email and password are required');
                return;
            }

            // Validation for a valid email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(loginData.email)) {
                setError('Invalid email format');
                return;
            }

            // Validation for a minimum password length
            if (loginData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
            setLoading(true)
            const response = await employeeLogin(loginData)
            setLoading(false)

            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('employeeToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                dispatch(loginUser(response.data?.user));
                navigate('/employee/dashboard')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className='h-screen'>
            {!loading
                ?
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src={KianLogo}
                            alt="YourCompany"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={loginData.email}
                                        autoComplete="email"
                                        required
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={loginData.password}
                                        autoComplete="current-password"
                                        required
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                {error && <p className='text-red-500 text-sm'>{error}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                            <div className="text-sm text-center">
                                <button
                                    onClick={() => navigate('/employee/forgot-password')}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                <LoadingSpinner />
            }
        </div>
    )
}

export default EmployeeLogin;