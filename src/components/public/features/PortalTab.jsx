import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import portalDashboardImage from '../../../assets/portalDashImg.png'
import menu from '../../../assets/menu.png'
import reimbursement from '../../../assets/reimbursement.png'
import passwordprotected from '../../../assets/passwordprotected.png'
import taxseason from '../../../assets/taxseason.png'
import expediteinvestment from '../../../assets/expediteinvestment.png'
import statusupdates from '../../../assets/statusupdates.png'
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
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>The employee portal that gets your work done faster</h1>
                </div>
                    <div className='grid grid-cols-2 max-w-[60%] mt-10 m-auto gap-4'>
                        <button onClick={() => navigate('/register')} className='lg:col-span-1 col-span-2 uppercase p-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button onClick={() => triggerModal()} className='lg:col-span-1 col-span-2 uppercase p-4 rounded border border-black '>Start a free trial</button>
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
        bannerDescription: 'Provide seamless collaboration between employees and payouts staff with a secure employee portal.',
    },
];
const features = [
    {
        imageSrc: menu,
        imageAlt: 'menu',
        title: 'Keep everything in one place',
        description: `Don't make employees look around for their payouts information. They can find pay summaries, tax summaries, notifications, loan deductions, and much more under one roof.`,
    },
    {
        imageSrc: reimbursement,
        imageAlt: 'reimbursement',
        title: 'Process employee reimbursements effortlessly',
        description: 'Employees can reclaim out-of-pocket business expenses and organization-provisioned reimbursements by attaching the appropriate bills within the portal.',
    },
    {
        imageSrc: passwordprotected,
        imageAlt: 'passwordprotected',
        title: 'Password-protected employee documents',
        description: `Secure your employees' payslips and tax computation worksheets with custom passwords to keep their data confidential.`,
    },
    {
        imageSrc: taxseason,
        imageAlt: 'taxseason',
        title: 'Ace tax season with compliance documents',
        description: 'Help your employees understand their tax liabilities and file their income tax returns with downloadable tax worksheets and Form 16.',
    },
    {
        imageSrc: expediteinvestment,
        imageAlt: 'expediteinvestment',
        title: 'Expedite investment proof submissions',
        description: `Notifications about investment declarations and FBP submissions within the portal ensure that your employees do not miss important submission deadlines.`,
    },
    {
        imageSrc: statusupdates,
        imageAlt: 'statusupdates',
        title: 'Status updates on employee loans',
        description: 'Kian payouts automatically deducts loan payments and updates the outstanding balance and tenure left for employee loans. Employees can find the latest updates in the portal.',
    },
];

export default PortalTab;