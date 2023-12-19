import React, { useEffect, useState } from 'react'
import kianPayoutsLogo from '../../assets/payoutsLogo.png'
import { useNavigate } from 'react-router-dom'
import { activatePremiumSubscription, organizationRegister, stripePayment } from '../../api/OrganizationApi';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [newOtp, setNewOtp] = useState('');
  const [paymentButton, setPaymentButton] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    otp: '',
  });
  
  const stripePromise = loadStripe('pk_test_51OJqAQSD0QFNYJECgjkoW3U7ZLDkQvDHvitr3RqE5Qd5YNrmSFYlnAK9O05yzfbP562g2jNuBIVTIPBq2Emo8bn5006XRjHrfh');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      handleSuccessfulPayment();

    } else if (query.get("canceled")) {
      toast.error("Payment Cancelled");
    }
  }, []);

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
      const response = await activatePremiumSubscription({ organizationId });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await organizationRegister(signupData)
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
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const newOtpString = String(newOtp);
      if (signupData?.otp === newOtpString) {
        toast.success('OTP verification succesful')
        setPaymentButton(true);
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
    const response = await stripePayment();
    const session = response.data.session;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:max-w-[80%] max-w-[90%] gap-10 mt-10 m-auto p-6'>
        <div className=''>
          <img src={kianPayoutsLogo} alt="KianPayouts" className='h-10' />
          <h4 className='mt-6'>Kian Payouts is online payouts software that helps businesses in India manage their payouts operations and pay employees on time.</h4>
          <h2 className='mt-10'>We built Kian payouts so you can:</h2>
          <div className='leading-[2.5rem]'>
            <p>&#9679; Streamline your payouts process end-to-end</p>
            <p>&#9679; Define clear roles for your payouts staff</p>
            <p>&#9679; Create salary components, allowances and more, the way you want</p>
            <p>&#9679; Compute your employees' paycheck accurately every time</p>
            <p>&#9679; Distribute salaries and payslips online</p>
            <p>&#9679; Automatic payouts accounting with Kian Books</p>
            <p>&#9679; Reduce payouts staff workload with collaborative self-service portal</p>
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
                      className='border-transparent px-8 py-2 my-1 min-w-[100%] mt-8 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
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
                      className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
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
                      className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
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
                      className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
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
                      className='border-transparent px-8 py-2 min-w-[100%] my-1 border-0 outline-none focus:shadow-0 border-b border-b-gray-200  focus:border-b-blue-100 focus:border-b-2' />
                  </div>
                  <div>
                    {error && <p className='text-red-500'>{error}</p>}
                  </div>

                  <h6 className='text-sm mt-5'>Your data will be in INDIA data center.</h6>
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
                    <button
                      type='button'
                      onClick={handleVerifyOTP}
                      className='mt-3 text-md text-violet-800 font-medium hover:text-black'>
                      Verify OTP
                    </button>
                  </div>
                  <button
                    disabled={!paymentButton}
                    className='text-lg bg-violet-500 text-white uppercase rounded-3xl lg:px-20 px-10 py-2 mt-10 mb-10'
                  >
                    Proceed to pay
                  </button>
                </form>}
            </div>
          </div>
          <h2 className='mt-4'>Already have an account? <button className='text-blue-600 font-medium' onClick={() => navigate('/login')}>Sign in</button></h2>
        </div>
      </div>
    </div>
  )
}

export default Registration;