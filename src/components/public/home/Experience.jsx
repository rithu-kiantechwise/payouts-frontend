import React from 'react'
import Calculation from '../../../assets/calculation.png'
import Hierarchy from '../../../assets/hierarchy.png'
import Complaint from '../../../assets/compliant.png'
import Portal from '../../../assets/portal.png'
import Salary from '../../../assets/salary.png'
import Administrator from '../../../assets/administrator.png'

const Experience = () => {
    return (
        <section className="mt-20">
            <div className="text-center">
                <h2 className="text-4xl font-semibold mb-5">Payroll experience redefined to be stress free</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[80%] m-auto cursor-pointer">
                {features.map((feature, index) => (
                    <div key={index} className="px-12 py-6">
                        <img src={feature.imageSrc} alt={feature.imageAlt} className="h-20 mb-4" />
                        <h3 className="font-bold text-2xl">{feature.title}</h3>
                        <p className='leading-8'>{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className="access-link mt-8 text-center">
                <button className='text-blue-800 font-semibold'>Explore More Features</button>
            </div>
        </section>
    )
}
const features = [
    {
        imageSrc: Calculation,
        imageAlt: 'automaticCalculation',
        title: 'Automatic payroll calculation',
        description: 'Run payroll in a few clicks and automatically generate payslips online with a thorough breakdown of taxes, allowances, and deductions.',
    },
    {
        imageSrc: Hierarchy,
        imageAlt: 'compensations',
        title: 'Embrace diverse salary structures',
        description: 'Create multiple pay slabs for your staff, leads, and managers and associate the right template with each employee.',
    },
    {
        imageSrc: Salary,
        imageAlt: 'Salary',
        title: 'Pay employees on time, every time',
        description: 'Transfer employees\' salaries directly to their bank accounts with timely online transfers and readily available bank advice.',
    },
    {
        imageSrc: Complaint,
        imageAlt: 'compliant',
        title: 'Straightforward statutory compliance',
        description: 'Steer your business clear of compliance penalties. We handle your statutory compliance including PF, PT, ESI, LWF and IT and make filing easy with tax reports.',
    },
    {
        imageSrc: Portal,
        imageAlt: 'portal',
        title: 'Encourage employee self service',
        description: 'Enable seamless collaboration between employees and your payroll staff and reduce the burden of employee requests.',
    },
    {
        imageSrc: Administrator,
        imageAlt: 'administration',
        title: 'Fine tune admin privileges',
        description: 'Invite your qualified staff to process payroll but maintain control with user roles and role-based access.',
    },
];

export default Experience;