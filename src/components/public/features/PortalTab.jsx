import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import portalDashboardImage from '../../../assets/portalDashImg.png'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const PortalTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div className='mt-16'>
            <FeatureBannerComponent data={featureBanner} />
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Invite employees to their own workspace online</h2>
                </div>
                <FeatureCardComponent data={features} />
            </section>
            <section className='max-w-[75%] bg-violet-100 m-auto mb-14 mt-20'>
                <div className='grid grid-cols-4 items-center mb-6 pt-8'>
                    <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>The employee portal that gets your work done faster</h1>
                </div>
                <div className="m-auto w-[50%] pb-8">
                    <div className='grid grid-cols-2 gap-3'>
                        <button onClick={() => navigate('/register')} className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button onClick={() => triggerModal()} className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

const featureBanner = [
    {
        imageSrc: portalDashboardImage,
        imageAlt: 'portalDashboardImage',
        bannerHeading: 'Self service your employees will love',
        bannerDescription: 'Provide seamless collaboration between employees and payroll staff with a secure employee portal.',
    },
];
const features = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Keep everything in one place',
        description: `Don't make employees look around for their payroll information. They can find pay summaries, tax summaries, notifications, loan deductions, and much more under one roof.`,
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Process employee reimbursements effortlessly',
        description: 'Employees can reclaim out-of-pocket business expenses and organization-provisioned reimbursements by attaching the appropriate bills within the portal.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Password-protected employee documents',
        description: `Secure your employees' payslips and tax computation worksheets with custom passwords to keep their data confidential.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Ace tax season with compliance documents',
        description: 'Help your employees understand their tax liabilities and file their income tax returns with downloadable tax worksheets and Form 16.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Expedite investment proof submissions',
        description: `Notifications about investment declarations and FBP submissions within the portal ensure that your employees do not miss important submission deadlines.`,
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Status updates on employee loans',
        description: 'Zoho Payroll automatically deducts loan payments and updates the outstanding balance and tenure left for employee loans. Employees can find the latest updates in the portal.',
    },
];

export default PortalTab;