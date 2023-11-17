import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import EmployeeDashboardImage from '../../../assets/employeeDashImg.png'
import migration from '../../../assets/migration.png'
import trophy from '../../../assets/trophy.png'
import salaryreimbursement from '../../../assets/salaryreimbursement.png'
import employeemanagement from '../../../assets/employeemanagement.png'
import employee from '../../../assets/employee.png'
import automated from '../../../assets/automated.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const EmployeeTab = () => {
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
                    <h2 className="text-2xl font-bold mb-10">Everything you need to manage your people, rolled into one</h2>
                </div>
                <FeatureCardComponent data={features} />
            </section>
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>Payouts system with seamless employee onboarding</h1>
                </div>
                <div className='grid grid-cols-2 max-w-[60%] mt-10 m-auto gap-4'>
                    <button onClick={() => navigate('/register')} className='lg:col-span-1 col-span-2 uppercase p-4 rounded text-white font-bold bg-violet-500'>Access kian payouts</button>
                    <button onClick={() => triggerModal()} className='lg:col-span-1 col-span-2 uppercase p-4 rounded border border-black'>Start a free trial</button>
                </div>
            </section>
        </div>
    )
}

const featureBanner = [
    {
        imageSrc: EmployeeDashboardImage,
        imageAlt: 'EmployeeDashboardImage',
        bannerHeading: 'Manage your employees and stay on top of your onboarding process',
        bannerDescription: 'Chart the right course for your payouts operations from the day you hire your first employee.',
    },
];
const features = [
    {
        imageSrc: migration,
        imageAlt: 'migration',
        title: 'Effortless data migration',
        description: 'Bring all your existing data into Kian payouts with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: trophy,
        imageAlt: 'trophy',
        title: 'Employee hikes, increments, and appraisals',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: salaryreimbursement,
        imageAlt: 'salaryreimbursement',
        title: 'Salary history and designation',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: employee,
        imageAlt: 'employee',
        title: 'Streamlined employee self-service',
        description: 'Reduce your payouts costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: employeemanagement,
        imageAlt: 'employeemanagement',
        title: 'Systematic employee exit management',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
    {
        imageSrc: automated,
        imageAlt: 'automated',
        title: 'Automated gratuity settlement',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
];

export default EmployeeTab;