import React, { useState } from 'react'
import PayoutsLogo from '../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'
import { organizationLogin } from '../../api/OrganizationApi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
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
      setLoading(true);
      const response = await organizationLogin(loginData)
      setLoading(false);

      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('organizationToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        dispatch(loginUser(response.data?.user));
        navigate('/organization/dashboard')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="mx-auto bg-gray-200">
      {!loading
        ?
        <div className='grid grid-cols-1 place-items-center h-screen'>
          <div className='p-10 bg-white min-w-[30%] shadow-xl'>
            <div className='mx-auto'>
              <img src={PayoutsLogo} alt="Payouts" className='h-10 mt-5' />
              <h1 className='text-2xl font-semibold mt-6'>Login</h1>
              <h4 className='text-sm'>to access Payouts</h4>
              <form onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email"></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    placeholder='Email Address'
                    className='px-10 py-3 rounded mt-10 min-w-[100%]' />
                </div>
                <div>
                  <label htmlFor="password"></label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    required
                    onChange={handleChange}
                    placeholder='Password'
                    className='px-10 py-3 rounded mt-5 min-w-[100%]' />
                </div>
                <div>
                  {error && <p className='text-red-500'>{error}</p>}
                </div>
                <button className='text-md px-9 py-3 mt-5 bg-blue-500 rounded text-white min-w-[100%] mb-3'>Login</button>
              </form>
              <button
                onClick={() => navigate('/organization/forgot-password')}
                className='text-md font-medium text-blue-500 text-center pb-5'>
                Forgot Password?
              </button>
            </div>
            <h1 className='self-baseline'>If you are an employee? <button className='font-medium text-blue-500 ' onClick={() => navigate('/employee/login')}>Employee Login</button></h1>
          </div>
          <h1 className='self-baseline'>Don't have Payouts account? <button className='font-medium text-blue-500 ' onClick={() => navigate('/organization/register')}>Sign Up Now</button></h1>
        </div>
        :
        <LoadingSpinner />
      }
    </div>
  )
}

export default Login;