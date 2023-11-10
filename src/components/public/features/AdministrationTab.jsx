import React from 'react'
import AdminDashboardImage from '../../../assets/adminDashImg.png'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'
import CardComponent from './CardComponent'

const AdministrationTab = () => {
    return (
        <div className='mt-16'>
            <section className='grid grid-cols-2'>
                <div className='px-20 py-16'>
                    <h1 className='text-3xl font-bold leading-[2.5rem]'>Streamline your administration tasks and manage payroll like a pro</h1>
                    <h4 className='text-xl leading-[2rem] mt-4'>Zoho Payroll is everything you need to administer payroll for your organization. You can grant user roles and permissions, delegate responsibilities, oversee approvals, and build your organization your way.</h4>
                    <div className='grid grid-cols-2 gap-3 mt-14'>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                        <button className=' lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                    </div>
                </div>
                <div className='shadow-lg'>
                    <img src={AdminDashboardImage} alt="AdminDashboardImage" />
                </div>
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Everything you need to run your payroll</h2>
                </div>
                <CardComponent data={Everything} />
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Empower your staff to collaborate without losing your control</h2>
                </div>
                <CardComponent data={Empower} />
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Templates make your work easy</h2>
                </div>
                <CardComponent data={Template} />
            </section>
            <section className='max-w-[75%] bg-violet-100 m-auto mb-14 mt-20'>
                <div className='grid grid-cols-4 items-center mb-6 pt-8 max-w-[80%] m-auto'>
                    <h1 className='text-center text-4xl font-bold col-span-4 mb-4'>Payroll software with everything you need for administration.</h1>
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

const Everything = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Straightforward setup',
        description: 'Enter your organization details, tax information, employee details, salary components, and pay schedule to get your payroll up and running right away.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Multiple work locations',
        description: 'While you continue expand your business, we help you distribute the same perfect payslips across all your branches in different states.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Personalized salary components',
        description: `Choose different allowances, earnings, reimbursements, and prerequisite for different employees. Easily enable or disable individual components, and Zoho Payroll will adjust to your settings and calculate the right pay.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Allowances that reflect your culture',
        description: 'Choose from the list of preset allowances or tailor allowance categories to support your employees while they support your business.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Policies that set the tone for your organization',
        description: `Define your organization's FBP, reimbursement claims, and submission rules for IT declarations and investment proofs. You can collect POIs in multiple phases and set the dates when the resulting tax adjustments will be reflected in your employees' pay.`,
    },
];

const Empower = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Create unique roles for different teams',
        description: 'Create multiple user roles to help your finance, admin, and auditing teams collaborate effortlessly. Ensure data integrity by granting users role-based access to the specific modules they need.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Delegate payroll responsibilities',
        description: 'Share your workload and get work done faster. Use controlled access to invite your qualified staff to administer payroll.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Implement a payroll approval process',
        description: `Create payroll approval workflows and ensure pay runs get processed only after they get the go-ahead from you or your payroll administrator.`,
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Send organizational announcements',
        description: 'Send broadcast reminders with the due dates to submit investment proofs, income tax, or flexible benefit plan declarations.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Stay informed with timely notifications',
        description: `Receive personalized notifications and stay on top of everything that happens within your organization, from adding new employees to your payroll system to setting up their bank information and transferring salaries.`,
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'See it all in one place',
        description: 'Get a holistic summary of your entire payroll operation. Check for pending pay runs, outstanding taxes and forms, employees under your payroll, and payroll expenses incurred, all from your dashboard.',
    },
];

const Template = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Organized salary templates',
        description: `Support your organization's salary structure with personalized salary templates for various job roles. Associate a template with each employee and see their salary details get populated automatically.`,
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Professional-looking payslip templates',
        description: 'Choose from our collection of templates to build payslips with a clear breakdown of salary components, allowances, taxes withheld, and deductions. .',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Personalize portal invites',
        description: `Invite employees with a personalized message to get their work done, while you get your work done.`,
    },
];

export default AdministrationTab;