import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';
import AdminDashboardImage from '../../../assets/organization-employee-details.png'
import details from '../../../assets/details.png'
import location from '../../../assets/location.png'
import personalised from '../../../assets/personalised.png'
import allowance from '../../../assets/allowance.png'
import policy from '../../../assets/policy.png'
import multipleuser from '../../../assets/multipleuser.png'
import workloadshare from '../../../assets/workloadshare.png'
import payrollapproval from '../../../assets/payrollapproval.png'
import broadcast from '../../../assets/broadcast.png'
import notification from '../../../assets/notification.png'
import holisticsummary from '../../../assets/holisticsummary.png'
import employeemanagement from '../../../assets/employeemanagement.png'
import professionalpayslip from '../../../assets/professionalpayslip.png'
import salarystructure from '../../../assets/salarystructure.png'
import FeatureCardComponent from './FeatureCardComponent'
import FeatureBannerComponent from './FeatureBannerComponent'

const AdministrationTab = () => {
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
                    <h2 className="text-2xl font-bold mb-10">Everything you need to run your payouts</h2>
                </div>
                <FeatureCardComponent data={Everything} />
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Empower your staff to collaborate without losing your control</h2>
                </div>
                <FeatureCardComponent data={Empower} />
            </section>
            <section className="mt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-10">Templates make your work easy</h2>
                </div>
                <FeatureCardComponent data={Template} />
            </section>
            <section className='md:max-w-[75%] bg-violet-100 m-auto p-8 mt-10 lg:mt-20'>
                <div className='grid grid-cols-4 items-center max-w-[80%] m-auto'>
                    <h1 className='text-center text-4xl font-semibold col-span-4'>Payouts software with everything you need for administration.</h1>
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
        imageSrc: AdminDashboardImage,
        imageAlt: 'AdminDashboardImage',
        bannerHeading: 'Streamline your administration tasks and manage payroll like a pro',
        bannerDescription: 'payroll is everything you need to administer payroll for your organization. You can grant user roles and permissions, delegate responsibilities, oversee approvals, and build your organization your way.',
    },
];
const Everything = [
    {
        imageSrc: details,
        imageAlt: 'details',
        title: 'Straightforward setup',
        description: 'Enter your organization details, tax information, employee details, salary components, and pay schedule to get your payouts up and running right away.',
    },
    {
        imageSrc: location,
        imageAlt: 'location',
        title: 'Multiple work locations',
        description: 'While you continue expand your business, we help you distribute the same perfect payslips across all your branches in different states.',
    },
    {
        imageSrc: personalised,
        imageAlt: 'personalised',
        title: 'Personalized salary components',
        description: `Choose different allowances, earnings, reimbursements, and prerequisite for different employees. Easily enable or disable individual components, and payouts will adjust to your settings and calculate the right pay.`,
    },
    {
        imageSrc: allowance,
        imageAlt: 'allowance',
        title: 'Allowances that reflect your culture',
        description: 'Choose from the list of preset allowances or tailor allowance categories to support your employees while they support your business.',
    },
    {
        imageSrc: policy,
        imageAlt: 'policy',
        title: 'Policies that set the tone for your organization',
        description: `Define your organization's FBP, reimbursement claims, and submission rules for IT declarations and investment proofs. You can collect POIs in multiple phases and set the dates when the resulting tax adjustments will be reflected in your employees' pay.`,
    },
];

const Empower = [
    {
        imageSrc: multipleuser,
        imageAlt: 'multipleuser',
        title: 'Create unique roles for different teams',
        description: 'Create multiple user roles to help your finance, admin, and auditing teams collaborate effortlessly. Ensure data integrity by granting users role-based access to the specific modules they need.',
    },
    {
        imageSrc: workloadshare,
        imageAlt: 'workloadshare',
        title: 'Delegate payouts responsibilities',
        description: 'Share your workload and get work done faster. Use controlled access to invite your qualified staff to administer payouts.',
    },
    {
        imageSrc: payrollapproval,
        imageAlt: 'payoutsapproval',
        title: 'Implement a payouts approval process',
        description: `Create payouts approval workflows and ensure pay runs get processed only after they get the go-ahead from you or your payouts administrator.`,
    },
    {
        imageSrc: broadcast,
        imageAlt: 'broadcast',
        title: 'Send organizational announcements',
        description: 'Send broadcast reminders with the due dates to submit investment proofs, income tax, or flexible benefit plan declarations.',
    },
    {
        imageSrc: notification,
        imageAlt: 'notification',
        title: 'Stay informed with timely notifications',
        description: `Receive personalized notifications and stay on top of everything that happens within your organization, from adding new employees to your payouts system to setting up their bank information and transferring salaries.`,
    },
    {
        imageSrc: holisticsummary,
        imageAlt: 'holisticsummary',
        title: 'See it all in one place',
        description: 'Get a holistic summary of your entire payouts operation. Check for pending pay runs, outstanding taxes and forms, employees under your payouts, and payouts expenses incurred, all from your dashboard.',
    },
];

const Template = [
    {
        imageSrc: salarystructure,
        imageAlt: 'salarystructure',
        title: 'Organized salary templates',
        description: `Support your organization's salary structure with personalized salary templates for various job roles. Associate a template with each employee and see their salary details get populated automatically.`,
    },
    {
        imageSrc: professionalpayslip,
        imageAlt: 'professionalpayslip',
        title: 'Professional-looking payslip templates',
        description: 'Choose from our collection of templates to build payslips with a clear breakdown of salary components, allowances, taxes withheld, and deductions. .',
    },
    {
        imageSrc: employeemanagement,
        imageAlt: 'employeemanagement',
        title: 'Personalize portal invites',
        description: `Invite employees with a personalized message to get their work done, while you get your work done.`,
    },
];

export default AdministrationTab;