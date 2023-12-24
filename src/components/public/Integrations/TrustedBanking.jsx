import React from 'react'
import BankIcon from '../../../assets/payoutsLogo.png'

const TrustedBanking = () => {
    return (
        <div className='mt-10'>
            <h2 className='text-3xl font-bold text-center mt-10'>Trusted partnerships for your payouts banking needs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[80%] mt-10 md:mt-16 m-auto">
                {features.map((feature, index) => (
                    <div key={index} className=" flex flex-col justify-around p-6 border rounded-md">
                        <div className='min-w-[18%]'>
                            <img src={feature.imageSrc} alt={feature.imageAlt} className="h-10 mb-4" />
                        </div>
                        <p className='leading-8 mt-3'>{feature.description}</p>
                        <button className='text-blue-500 font-bold mt-20'>{feature.button} &rarr;</button>
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
        title: 'Effortless data migration',
        description: 'Bring all your existing data into payouts with minimum effort. Follow our pre-defined template to import salary or previous employment details, and eliminate duplicates and reduce manual work.',
        button: 'Automate Salary Payments'
    },
    {
        imageSrc: BankIcon,
        imageAlt: 'compensations',
        title: 'Employee hikes, increments, and appraisals',
        description: 'Attract and retain the right talent with the right rewards. Revise the CTC, and pick the date from which the hike in pay will be reflected on the payslips.',
        button: 'Secure Salary Payments'
    },
    {
        imageSrc: BankIcon,
        imageAlt: 'Salary',
        title: 'Salary history and designation',
        description: `Follow your employee's career progress by tracking their salary revision history and designation changes. Automatic updates in the self-service portal keeps employees informed too.`,
        button: 'Make Salary Payments effortless'
    },
]

export default TrustedBanking;