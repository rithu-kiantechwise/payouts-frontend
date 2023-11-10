import React from 'react'

const FAQ = () => {
    return (
        <div className='max-w-[80%] m-auto mt-28'>
            <h1 className='text-5xl font-semibold mt-10 text-center'>Frequently Asked Questions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[80%] m-auto mt-10">
                {QuestionAndAnswer.map((feature, index) => (
                    <div key={index} className="p-10 border-b">
                        <h3 className="font-semibold text-2xl">{feature.question}</h3>
                        <p className='leading-8 mt-3'>{feature.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const QuestionAndAnswer = [
    {
        question: 'Can I try the product before purchasing it?',
        answer: `Absolutely, yes. Sign up now for a monthly free-trial and enjoy unrestricted access to all the features of Zoho Payroll. No credit card information required.`,
    },
    {
        question: 'How is the free trial different from the free plan?',
        answer: 'The free trial is simply the paid product with all benefits which you can access for a month, after which you are required to upgrade to continue using it. The free plan offers you Zoho Payroll for an unlimited period with a few limitations on the number of employees and some features.',
    },
    {
        question: 'What happens when I am no longer eligible for the free plan?',
        answer: `You can easily upgrade to our affordable paid version, and automate payroll with advanced features.`,
    },
    {
        question: 'I am convinced by Zoho Payroll. What are my payment options?',
        answer: `We accept payments via Visa, MasterCard, and American Express. We also accept PayPal and wire transfer for the yearly plan.`,
    },
    {
        question: 'Do we need different payroll licenses if our office is located in multiple states?',
        answer: 'You will have to purchase separate payroll licenses for each legal entity. If there is only one legal entity and multiple branches of the same entity, then a single license should suffice.',
    },
    {
        question: 'Can data be imported from other payroll software?',
        answer: `Yes, data can be imported from other payroll software in a format that's compatible with Zoho Payroll. Our dedicated support team can guide you every step of the way to import your payroll data successfully.`,
    },
    {
        question: 'Is Zoho Payroll a part of Zoho One?',
        answer: `Yes, Zoho Payroll is included in Zoho One. Reach out to our support team to understand how the pricing and licenses are handled.`,
    },
    {
        question: 'Do you store my credit card information?',
        answer: `No, we don't store your credit card information. Read our Privacy Policy to learn more.`,
    },
    {
        question: 'How secure are my transactions?',
        answer: `We secure your payroll data with 256-bit SSL encryption, two-factor authentication, regular intrusion/virus detection and prevention scanning.`,
    },
    {
        question: 'Can I run more than one business?',
        answer: `Yes, absolutely. You can have multiple businesses as different organizations associated with your Zoho Payroll account.`,
    },
    {
        question: 'Have more questions?',
        answer: `Reach out to us at support@zohopayroll.com and we'll get back to you at the earliest.`,
    },
]

export default FAQ;