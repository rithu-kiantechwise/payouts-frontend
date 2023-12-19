import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import payrollDashboardImage from '../../../assets/payrollDashImg.png'
import deductsocial from '../../../assets/deductsocial.png'
import payclick from '../../../assets/payclick.png'
import customdeduction from '../../../assets/customdeduction.png'
import personalised from '../../../assets/personalised.png'
import earnings from '../../../assets/earnings.png'
import sharesecure from '../../../assets/sharesecure.png'
import timenotification from '../../../assets/timeNotification.png'
import automated from '../../../assets/automated.png'
import holidays from '../../../assets/holidays.png'
import employeeleaves from '../../../assets/employeeleaves.png'
import manageemployee from '../../../assets/manageemployee.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const PayrollTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='mt-16'>
            <FeatureBannerComponent data={featureBanner} />
            <section className="mt-20">
                <div className="text-center max-w-[50%] m-auto">
                    <h2 className="text-2xl font-bold mb-10">Uncomplicate payouts processing with features that give you more power</h2>
                </div>
                <FeatureCardComponent data={features} />
            </section>
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>Less paperwork. More control. Greater accuracy.</h1>
                </div>
                    <div className='grid grid-cols-2 max-w-[60%] mt-10 m-auto gap-4'>
                        <button onClick={() => navigate('/organization/register')} className='lg:col-span-1 col-span-2 uppercase p-4 rounded text-white font-bold bg-violet-500 '>Access payouts</button>
                        <button onClick={() => triggerModal()} className='lg:col-span-1 col-span-2 uppercase p-4 rounded border border-black '>Start a free trial</button>
                    </div>
            </section>
        </div>
    )
}

const featureBanner = [
    {
        imageSrc: payrollDashboardImage,
        imageAlt: 'payoutsDashboardImage',
        bannerHeading: 'Automate and complete your payouts processing in minutes',
        bannerDescription: 'Stop spending weeks on payouts processing. Kian payouts has everything you need to complete your payouts and post-payouts activities faster.',
    },
];

const features = [
    {
        imageSrc: deductsocial,
        imageAlt: 'deductsocial',
        title: 'Choose an industry-specific pay schedule',
        description: `Pick a payouts routine that fits your business. Fill your employees' pockets on the last day of every month, or choose your own custom payday.`,
    },
    {
        imageSrc: payclick,
        imageAlt: 'payclick',
        title: 'Complete pay runs in a click',
        description: 'Spend less time completing your payouts. Once you have your paydays and schedule set, a click is all it takes to pay your employees.',
    },
    {
        imageSrc: earnings,
        imageAlt: 'earnings',
        title: 'Add customized one-time earnings',
        description: `Plan and manage employee bonuses for holidays or profit-sharing programs and easily apply pre-tax or post-tax deductions.`,
    },
    {
        imageSrc: customdeduction,
        imageAlt: 'customdeduction',
        title: 'Apply custom deductions to payslips',
        description: 'Set up one-time or recurring profiles to take care of voluntary and mandatory payouts deductions. Kian payouts automatically deducts the right amount and applies the appropriate taxes during each pay run.',
    },
    {
        imageSrc: personalised,
        imageAlt: 'personalised',
        title: 'Disburse salaries online or offline',
        description: `Credit employees' salaries directly to their bank accounts online for simple, timely payouts. Offline check payments are easy to record too.`,
    },
    {
        imageSrc: sharesecure,
        imageAlt: 'sharesecure',
        title: 'Share secured payslips online',
        description: 'Generate password-protected payslips and make them accessible online in a ready-to-download PDF format.',
    },
    {
        imageSrc: timenotification,
        imageAlt: 'timenotification',
        title: 'Receive timely notifications',
        description: 'Kian payouts lets you confirm processed payouts, see upcoming tax submission dates, and stay on top of your payouts operations.',
    },
    {
        imageSrc: automated,
        imageAlt: 'automated',
        title: 'Automated loan management',
        description: `Support your employees' financial needs with loans and track them automatically until they're repaid. Loan installments are periodically deducted from your employees' pay, and real-time notifications keep everyone in the loop.`,
    },
    {
        imageSrc: holidays,
        imageAlt: 'holidays',
        title: 'Adapt pay runs to holidays',
        description: `Pay date falls on a weekend or a government-declared holiday? Kian payouts automatically adapts your pay runs to process the day before the closure.`,
    },
    {
        imageSrc: employeeleaves,
        imageAlt: 'employeeleaves',
        title: 'Temporarily exclude employees from pay runs',
        description: 'Employee leaves can stretch from weeks to months. Easily record the reason for their absence, and continue to process your current pay runs without skipping a beat.',
    },
    {
        imageSrc: manageemployee,
        imageAlt: 'manageemployee',
        title: 'Manage employee exits professionally',
        description: `Letting an employee go might be hard, but once the decision is made, Kian payouts makes the process easy. Run termination payouts to handle your employees' notice pay, leave encashment, and other exit requirements effortlessly.`,
    },
];

export default PayrollTab;