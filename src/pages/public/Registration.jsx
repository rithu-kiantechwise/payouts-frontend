import React, { useEffect, useState } from 'react'
import PayoutsLogo from '../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'
import { activatePremiumSubscription, cancelPremiumSubscription, organizationRegister, stripePayment } from '../../api/OrganizationApi';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [newOtp, setNewOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    otp: '',
    allowedEmployees: '',
    plan: '',
  });

  const stripePromise = loadStripe('pk_live_51OPMHXSHtHwrHp77uCrFgiwYdNE8TMrz0pGyplD29qt1y73SaZZUbWJoyfi1vB4Qpqa2UGCXY8IL2oLo7X5DSPQD00aNpjKwIb');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      handleSuccessfulPayment();

    } else if (query.get("canceled")) {
      handleCancelledPayment();
    }
  });

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      setSignupData({
        ...signupData,
        [name]: value,
      });
    } catch (error) {
      console.error('Error in handleChange:', error);
    }
  };

  const handleSuccessfulPayment = async () => {
    try {
      const organizationId = localStorage.getItem('organizationId')
      const planDuration = parseInt(signupData.plan);
      console.log(planDuration,'planDuration');
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + planDuration);

      const subscriptionData = {
        organizationId,
        planDuration,
        subscriptionStartDate,
        subscriptionEndDate,
      };
      const response = await activatePremiumSubscription(subscriptionData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.clear();
        navigate('/organization/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error in handleSuccessfulPayment:', error);
    }
  }

  const handleCancelledPayment = async () => {
    try {
      const organizationId = localStorage.getItem('organizationId')
      const response = await cancelPremiumSubscription({ organizationId });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem('organizationId');
        navigate('/organization/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error in handleSuccessfulPayment:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await organizationRegister(signupData);
        setLoading(false);
        if (response.data.success) {
          const newUser = response.data.newUser
          console.log(response.data.otp);
          toast.success(response.data.message)
          setNewOtp(response.data.otp)
          localStorage.setItem('organizationId', newUser._id)
          setSignupData(newUser)
          setStep(2)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error('Login failed:', error);
        setError('Invalid email or password');
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const newOtpString = String(newOtp);
      if (signupData?.otp === newOtpString) {
        toast.success('OTP verification succesful')
        setIsEmailVerified(true);
      }
      else {
        toast.error('Invalid OTP')
      }
    } catch (error) {
      console.error('Error in handleVerifyOtp:', error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    setLoading(true);
    const response = await stripePayment(signupData);
    setLoading(false);
    const session = response.data.session;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error.message);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate phoneNumber
    if (!signupData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/g.test(signupData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits)';
    }

    // Validate password
    if (!signupData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate location
    if (!signupData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Validate allowedEmployees
    if (!signupData.allowedEmployees) {
      newErrors.allowedEmployees = 'Number of Employees is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className='container mx-auto'>
      {!loading
        ?
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:max-w-[80%] max-w-[90%] gap-10 mt-10 m-auto p-6'>
          <div className=''>
            <img src={PayoutsLogo} alt="Payouts" className='h-10' />
            <h4 className='mt-6'> Payouts, an online payroll software, empowers businesses to efficiently manage payroll operations and ensure timely employee payments.</h4>
            <h2 className='mt-10'>With Payouts, you can:</h2>
            <div className='leading-[2.5rem]'>
              <p>&#9679; Seamlessly streamline your entire payroll process.</p>
              <p>&#9679; Establish distinct roles for your payroll team.</p>
              <p>&#9679; Customize salary components, allowances, and more to your preferences.</p>
              <p>&#9679; Precisely calculate employee paychecks every time.</p>
              <p>&#9679; Easily distribute salaries and digital payslips.</p>
              <p>&#9679; Automate payroll accounting seamlessly through Payouts.</p>
              <p>&#9679; Decrease payroll staff workload by utilizing the collaborative self-service portal.</p>
            </div>
          </div>
          <div className='text-center'>
            <div className='p-8 border-t-4 border-violet-500 shadow-xl rounded'>
              <div>
                {step === 1 &&
                  <form onSubmit={handleSubmit} className='overflow-hidden'>
                    <h1 className='text-3xl'>Let's get Started</h1>
                    <h4 className='mt-2'>Explore all the features with a 14-day free trial</h4>
                    <div className=''>
                      <label htmlFor="name"></label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={signupData.name}
                        required
                        onChange={handleChange}
                        placeholder='Company Name'
                        className='border-transparent px-8 py-2 my-1 min-w-[100%] mt-8 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      {errors.name && <p className='text-red-500'>{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email"></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={signupData.email}
                        autoComplete="email"
                        required
                        onChange={handleChange}
                        placeholder='Email'
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phoneNumber"></label>
                      <input
                        id='phoneNumber'
                        name='phoneNumber'
                        type="number"
                        placeholder='Phone Number'
                        value={signupData.phoneNumber}
                        required
                        onChange={handleChange}
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber}</p>}
                    </div>

                    <div>
                      <label htmlFor="password"></label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={signupData.password}
                        required
                        onChange={handleChange}
                        placeholder='Password'
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="location"></label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={signupData.location}
                        required
                        onChange={handleChange}
                        placeholder='Location'
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      {errors.location && <p className='text-red-500'>{errors.location}</p>}
                    </div>

                    <div>
                      <label htmlFor="allowedEmployees"></label>
                      <select
                        id="allowedEmployees"
                        name="allowedEmployees"
                        value={signupData.allowedEmployees}
                        required
                        onChange={handleChange}
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2'
                      >
                        <option disabled value='' className='text-gray-100'>No. of Employees</option>
                        {[...Array(81).keys()].map((value) => (
                          value + 20 <= 100 && (
                            <option key={value} value={value + 20}>
                              {value + 20}
                            </option>
                          )
                        ))}
                      </select>
                    </div>
                    <div>
                      {errors.allowedEmployees && <p className='text-red-500'>{errors.allowedEmployees}</p>}
                    </div>

                    <div>
                      {error && <p className='text-red-600 text-sm'>{error}</p>}
                    </div>
                    <button
                      className='text-lg bg-violet-500 text-white uppercase rounded-3xl lg:px-20 px-10 py-2 mt-10'
                    >
                      Sign up now
                    </button>
                  </form>}
              </div>

              <div>
                {step === 2 &&
                  <form onSubmit={handlePayment} className='overflow-hidden mb-10 pt-10'>
                    <h4 className='text-2xl mb-5 mt-10 pt-10'>Verify your email</h4>
                    <div>
                      <label htmlFor="email"></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={signupData.email}
                        disabled
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 text-gray-600 focus:border-b-blue-100 focus:border-b-2' />
                    </div>
                    <div>
                      <label htmlFor="otp"></label>
                      <input
                        id='otp'
                        name='otp'
                        type="number"
                        placeholder='Enter your OTP'
                        value={signupData.otp}
                        required
                        onChange={handleChange}
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
                      {!isEmailVerified &&
                        <button
                          type='button'
                          onClick={handleVerifyOTP}
                          className='mt-3 text-md text-violet-800 font-medium hover:text-black'>
                          Verify OTP
                        </button>
                      }
                    </div>

                    <div>
                      <label htmlFor="plan"></label>
                      <select
                        id="plan"
                        name="plan"
                        value={signupData.plan}
                        required
                        onChange={handleChange}
                        className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200 focus:border-b-blue-100 focus:border-b-2'
                      >
                        <option disabled value='1'>Select a plan</option>
                        <option value="12">1 Year subscription</option>
                        <option value="6">6 Months subscription</option>
                        <option value="3">3 Months subscription</option>
                        <option value="1">1 Month subscription</option>
                      </select>
                    </div>
                    <div>
                      {error && <p className='text-red-600 text-sm'>{error}</p>}
                    </div>
                    <button
                      disabled={!isEmailVerified}
                      className='text-lg bg-violet-500 text-white uppercase rounded-3xl lg:px-20 px-10 py-2 mt-10 mb-10'
                    >
                      Proceed to pay
                    </button>
                  </form>}
              </div>
            </div>
            <h2 className='mt-4'>Already have an account? <button className='text-blue-600 font-medium' onClick={() => navigate('/organization/login')}>Login</button></h2>
          </div>
        </div>
        :
        <LoadingSpinner />
      }
    </div>
  )
}

export default Registration;