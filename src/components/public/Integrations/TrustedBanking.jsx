import React from 'react'
import BankIcon from '../../../assets/payoutsLogo.png'

const TrustedBanking = () => {
    return (
        <div className='mt-10'>
            <h2 className='text-3xl font-bold text-center mt-10'>Auto integrations for your HR and accounting needs in Payouts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[80%] mt-10 md:mt-16 m-auto">
                {features.map((feature, index) => (
                    <div key={index} className=" flex flex-col justify-around p-6 border rounded-md">
                        <div className='min-w-[18%]'>
                            <img src={feature.imageSrc} alt={feature.imageAlt} className="h-10 mb-4" />
                        </div>
                        <p className='text-lg font-medium mt-3'>{feature.title}</p>
                        <p className='leading-8 mt-3'>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const features = [
    {
        imageSrc: BankIcon,
        imageAlt: 'automaticCalculation',
        title: 'HR Management',
        description: 'Take control of the complete employee journey with our cloud-based HRMS. Created for your needs, this user-friendly application helps you enrol staff, manage work hours, and tab their leave policies.',
    },
    {
        imageSrc: BankIcon,
        imageAlt: 'compensations',
        title: 'Taxation',
        description: 'Find your way to a healthy tax-compliant business at the end of every month. Our cloud-based GST-compliant accounting application, records your payroll transactions automatically so you can say goodbye to the errors involved in manual data entries.',
    },
    {
        imageSrc: BankIcon,
        imageAlt: 'Salary',
        title: 'Reimbursement',
        description: `Pay business expense reimbursements along with salaries with this integration. Our expense management feature, makes it easy to streamline business travel, automate expense reporting, and work in unison with payroll operations.`,
    },
]

export default TrustedBanking;