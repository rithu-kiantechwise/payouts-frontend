import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import reportDashboardImage from '../../../assets/reportDashImg.png'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const ComplianceTab = () => {
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
                    <h2 className="text-2xl font-bold mb-10">Empower your staff to collaborate without losing your control</h2>
                </div>
                <FeatureCardComponent data={Empower} />
            </section>
            <section className="mt-20">
                <div className="text-center max-w-[40%] m-auto">
                    <h2 className="text-2xl font-bold mb-10">Automated reports do the heavy lifting to keep your organization compliant</h2>
                </div>
                <FeatureCardComponent data={Automated} />
            </section>
            <section className='max-w-[75%] bg-violet-100 m-auto mb-14 mt-20'>
                <div className='grid grid-cols-4 items-center mb-6 pt-8'>
                    <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Payroll compliance has never been easier or more straightforward.</h1>
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
        imageSrc: reportDashboardImage,
        imageAlt: 'reportDashboardImage',
        bannerHeading: 'Keep payroll compliance easy amidst changing tax laws',
        bannerDescription: 'Keep your business on good legal footing with Zoho Payroll. Apply appropriate tax deductions, calculate mandatory government contributions, and generate tax-compliant payslips.',
    },
];
const Empower = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Adapt to varying scenarios',
        description: 'Bring all your existing data into Zoho Payroll with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: `Build employees' retirement chests`,
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Deduct social security benefits taxes',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Collect professional tax accurately',
        description: 'Reduce your payroll costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Prepare employees to file IT returns',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Pay the Government its dues',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Account for the Labour Welfare Fund',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
];

const Automated = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Statutory compliance reports',
        description: 'Bring all your existing data into Zoho Payroll with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Payroll compliance reports',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Income tax return report',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Payroll journal report',
        description: 'Reduce your payroll costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Audit trail reports',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
];

export default ComplianceTab;