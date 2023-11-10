import React from 'react'
import EmployeeDashboardImage from '../../../assets/employeeDashImg.png'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'
import CardComponent from './CardComponent'

const EmployeeTab = () => {
    return (
        <div className='mt-16'>
            <section className='grid grid-cols-2'>
                <div className='px-20 py-16'>
                    <h1 className='text-3xl font-bold leading-[2.5rem]'>Manage your employees and stay on top of your onboarding process</h1>
                    <h4 className='text-xl leading-[2rem] mt-4'>Chart the right course for your payroll operations from the day you hire your first employee.</h4>
                    <div className='grid grid-cols-2 gap-3 mt-14'>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                    </div>
                </div>
                <div className='shadow-lg'>
                    <img src={EmployeeDashboardImage} alt="EmployeeDashboardImage" />
                </div>
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Everything you need to manage your people, rolled into one</h2>
                </div>
                <CardComponent data={features} />
            </section>
            <section className='max-w-[75%] bg-violet-100 m-auto mb-14 mt-20'>
                <div className='grid grid-cols-4 items-center mb-6 pt-8'>
                    <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Payroll system with seamless employee onboarding</h1>
                </div>
                <div className="m-auto w-[50%] pb-8">
                    <div className='grid grid-cols-2 gap-3'>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
const features = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Effortless data migration',
        description: 'Bring all your existing data into Zoho Payroll with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Employee hikes, increments, and appraisals',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Salary history and designation',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Streamlined employee self-service',
        description: 'Reduce your payroll costs and data entry efforts by delegating routine document tasks to your employees. Employees can do things on their own from the client portal.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Systematic employee exit management',
        description: `Enter your departing employee's last working day along with the full and final settlement date to process the pay automatically. You can encash unused leaves, send their final payslips, and Form-16 to an email address of their choice.`,
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Automated gratuity settlement',
        description: 'Acknowledge efforts of your long-serving staff. With automated gratuity calculation, let your parting employees reap their rewards immediately.',
    },
];

export default EmployeeTab;