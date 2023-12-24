import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import benefitsDashImage from '../../../assets/employee-salary-details.png'
import pretaxdeduction from '../../../assets/pretaxdeduction.png'
import salaryadvances from '../../../assets/salaryadvances.png'
import multipleloan from '../../../assets/multipleloan.png'
import fuelexpenses from '../../../assets/fuelexpenses.png'
import trophy from '../../../assets/trophy.png'
import employeeprocess from '../../../assets/employeeprocess.png'
import automaticaccounting from '../../../assets/automaticaccounting.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const BenefitsTab = () => {
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
                    <h2 className="text-2xl font-bold mb-10">Boost your employees' productivity with rewarding benefits</h2>
                </div>
                <FeatureCardComponent data={Boost} />
            </section>
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>Payouts software that makes benefits administration simple and effortless.</h1>
                </div>
                    <div className='grid grid-cols-2 max-w-[60%] mt-10 m-auto gap-4'>
                        <button onClick={() => navigate('/organization/register')} className=' lg:col-span-1 col-span-2 uppercase p-4 rounded text-white font-bold bg-violet-500 '>Access payouts</button>
                        <button onClick={() => triggerModal()} className=' lg:col-span-1 col-span-2 uppercase p-4 rounded border border-black '>Start a free trial</button>
                    </div>
            </section>
        </div>
    )
}

const featureBanner = [
    {
        imageSrc: benefitsDashImage,
        imageAlt: 'benefitsDashImage',
        bannerHeading: `Employee benefits that best reflects your organizations' culture`,
        bannerDescription: 'Customize your benefit plans and offer a sense of security to employees with attractive allowances and benefits',
    },
];
const Boost = [
    {
        imageSrc: pretaxdeduction,
        imageAlt: 'pretaxdeduction',
        title: 'Manage employee insurances',
        description: 'Bring all your existing data into payouts with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: salaryadvances,
        imageAlt: 'salaryadvances',
        title: 'Salary advances',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: multipleloan,
        imageAlt: 'multipleloan',
        title: 'Multiple loan types',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: fuelexpenses,
        imageAlt: 'fuelexpenses',
        title: 'Personalized employee benefits',
        description: 'Reduce your payroll costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: trophy,
        imageAlt: 'trophy',
        title: 'Reward work with the right benefits',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
    {
        imageSrc: employeeprocess,
        imageAlt: 'employeeprocess',
        title: 'Keep tabs on reimbursements',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
    {
        imageSrc: automaticaccounting,
        imageAlt: 'automaticaccounting',
        title: 'Automatic accounting',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
];

export default BenefitsTab;