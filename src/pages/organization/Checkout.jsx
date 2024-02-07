import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRazorpay from "react-razorpay";
import Footer from '../../components/public/home/Footer';
import Header from '../../components/public/home/Header';
import Navbar from '../../components/public/home/Navbar';
import { activatePremiumSubscription, cancelPremiumSubscription, verifyPayment } from '../../api/OrganizationApi';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userDetails, setUserDetails] = useState({});
    const [orderDetails, setOrderDetails] = useState({});
    const { paymentData } = location.state || {};
    console.log(paymentData,'paymentData');
    const [Razorpay] = useRazorpay();

    useEffect(() => {
        if (paymentData && paymentData.order) {
            setOrderDetails(paymentData.order);
        }
    }, [paymentData]);
    setUserDetails(paymentData.userData);
    console.log(userDetails, 'userrrrrrr');
    console.log(orderDetails, 'orderDetails');

    const initPayment = async (e) => {
        e.preventDefault();

        const options = {
            key: "rzp_test_qzknbOvHpQZ67N",
            amount: orderDetails.amount,
            currency: orderDetails.currency,
            name: 'Payouts',
            description: "Premium Subscription",
            order_id: orderDetails.id,
            handler: async (response) => {
                try {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    const data = await verifyPayment({
                        orderId: razorpay_order_id,
                        paymentId: razorpay_payment_id,
                        signature: razorpay_signature,
                    })
                    console.log(data, 'ithaaan last data');
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new Razorpay(options);
        console.log(rzp1, 'v');
        rzp1.open();
    };

    const handleSuccessfulPayment = async () => {
        try {
            const organizationId = localStorage.getItem('organizationId');
            const planDuration = parseInt(userDetails.planDuration);
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

    return (
        <div>
            <Header />
            <Navbar />
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="md:w-2/3">
                            <div className="bg-white rounded border p-6 mb-4">
                                <div className='w-full'>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img className="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Productimage" />
                                            <span className="font-semibold">Payouts Premium</span>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <span className="font-semibold">Validity</span>
                                            <h1 className='font-medium'>12 months</h1>
                                            {/* <p>Next renewal on 02 jan</p> */}
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <span className="font-semibold">Price/Employee/Month</span>
                                            <h4>50 * 4 * 3</h4>
                                            {/* <h2>₹1977</h2> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="bg-gray-100 rounded p-6">
                                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Total</span>
                                    <span>₹19.99</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>GST</span>
                                    <span>18%</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-xl">Subtotal <sub>(INR)</sub></span>
                                    <span className="font-medium text-xl">₹21.98</span>
                                </div>
                                <button
                                    onClick={() => initPayment(orderDetails)}
                                    className="bg-violet-600 font-medium text-white py-2 px-4 mt-4 w-full"
                                >
                                    I'm Ready to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Checkout;