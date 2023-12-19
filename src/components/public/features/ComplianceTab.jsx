import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import reportDashboardImage from '../../../assets/reportDashImg.png'
import accuratetax from '../../../assets/accuratetax.png'
import retirement from '../../../assets/retirement.png'
import collecttax from '../../../assets/collecttax.png'
import file from '../../../assets/file.png'
import deductsocial from '../../../assets/deductsocial.png'
import tds from '../../../assets/tds.png'
import automated from '../../../assets/automated.png'
import audittrail from '../../../assets/audittrail.png'
import taxreturn from '../../../assets/taxreturn.png'
import timenotification from '../../../assets/timeNotification.png'
import payrollcompailance from '../../../assets/payrollcompailance.png'
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
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>payouts compliance has never been easier or more straightforward.</h1>
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
        imageSrc: reportDashboardImage,
        imageAlt: 'reportDashboardImage',
        bannerHeading: 'Keep payouts compliance easy amidst changing tax laws',
        bannerDescription: 'Keep your business on good legal footing with Kian payouts. Apply appropriate tax deductions, calculate mandatory government contributions, and generate tax-compliant payslips.',
    },
];
const Empower = [
    {
        imageSrc: accuratetax,
        imageAlt: 'accuratetax',
        title: 'Adapt to varying scenarios',
        description: 'Bring all your existing data into Kian payouts with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: retirement,
        imageAlt: 'retirement',
        title: `Build employees' retirement chests`,
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: deductsocial,
        imageAlt: 'deductsocial',
        title: 'Deduct social security benefits taxes',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: collecttax,
        imageAlt: 'collecttax',
        title: 'Collect professional tax accurately',
        description: 'Reduce your payouts costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: file,
        imageAlt: 'file',
        title: 'Prepare employees to file IT returns',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
    {
        imageSrc: tds,
        imageAlt: 'tds',
        title: 'Pay the Government its dues',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
    {
        imageSrc: automated,
        imageAlt: 'automated',
        title: 'Account for the Labour Welfare Fund',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
];

const Automated = [
    {
        imageSrc: retirement,
        imageAlt: 'retirement',
        title: 'Statutory compliance reports',
        description: 'Bring all your existing data into Kian payouts with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: payrollcompailance,
        imageAlt: 'payoutscompailance',
        title: 'payouts compliance reports',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: taxreturn,
        imageAlt: 'taxreturn',
        title: 'Income tax return report',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: timenotification,
        imageAlt: 'timenotification',
        title: 'payouts journal report',
        description: 'Reduce your payouts costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: audittrail,
        imageAlt: 'audittrail',
        title: 'Audit trail reports',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
];

export default ComplianceTab;