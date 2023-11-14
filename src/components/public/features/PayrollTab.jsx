import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import payrollDashboardImage from '../../../assets/payrollDashImg.png'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'
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
                    <h2 className="text-2xl font-bold mb-10">Uncomplicate payroll processing with features that give you more power</h2>
                </div>
                <FeatureCardComponent data={features} />
            </section>
            <section className='max-w-[75%] bg-violet-100 m-auto mb-14 mt-20'>
                <div className='grid grid-cols-4 items-center mb-6 pt-8'>
                    <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Less paperwork. More control. Greater accuracy.</h1>
                </div>
                <div className="m-auto w-[50%] pb-8">
                    <div className='grid grid-cols-2 gap-3'>
                        <button onClick={() => navigate('/register')} className='lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button onClick={() => triggerModal()} className='lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

const featureBanner = [
    {
        imageSrc: payrollDashboardImage,
        imageAlt: 'payrollDashboardImage',
        bannerHeading: 'Automate and complete your payroll processing in minutes',
        bannerDescription: 'Stop spending weeks on payroll processing. Zoho Payroll has everything you need to complete your payroll and post-payroll activities faster.',
    },
];

const features = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Choose an industry-specific pay schedule',
        description: `Pick a payroll routine that fits your business. Fill your employees' pockets on the last day of every month, or choose your own custom payday.`,
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Complete pay runs in a click',
        description: 'Spend less time completing your payroll. Once you have your paydays and schedule set, a click is all it takes to pay your employees.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Add customized one-time earnings',
        description: `Plan and manage employee bonuses for holidays or profit-sharing programs and easily apply pre-tax or post-tax deductions.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Apply custom deductions to payslips',
        description: 'Set up one-time or recurring profiles to take care of voluntary and mandatory payroll deductions. Zoho Payroll automatically deducts the right amount and applies the appropriate taxes during each pay run.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Disburse salaries online or offline',
        description: `Credit employees' salaries directly to their bank accounts online for simple, timely payroll. Offline check payments are easy to record too.`,
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Share secured payslips online',
        description: 'Generate password-protected payslips and make them accessible online in a ready-to-download PDF format.',
    },
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Receive timely notifications',
        description: 'Zoho Payroll lets you confirm processed payroll, see upcoming tax submission dates, and stay on top of your payroll operations.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Automated loan management',
        description: `Support your employees' financial needs with loans and track them automatically until they're repaid. Loan installments are periodically deducted from your employees' pay, and real-time notifications keep everyone in the loop.`,
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Adapt pay runs to holidays',
        description: `Pay date falls on a weekend or a government-declared holiday? Zoho Payroll automatically adapts your pay runs to process the day before the closure.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Temporarily exclude employees from pay runs',
        description: 'Employee leaves can stretch from weeks to months. Easily record the reason for their absence, and continue to process your current pay runs without skipping a beat.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Manage employee exits professionally',
        description: `Letting an employee go might be hard, but once the decision is made, Zoho Payroll makes the process easy. Run termination payroll to handle your employees' notice pay, leave encashment, and other exit requirements effortlessly.`,
    },
];

export default PayrollTab;