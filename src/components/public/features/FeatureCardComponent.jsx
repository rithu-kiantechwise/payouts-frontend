import React from 'react'

const FeatureCardComponent = ({ data }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[90%] md:max-w-[80%] m-auto">
            {data.map((feature, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-8 border bg-violet-50">
                    <div className='col-span-1 lg:max-w-[80%]'>
                        <img src={feature.imageSrc} alt={feature.imageAlt} className="max-w-[100%] h-auto" />
                    </div>
                    <div className='col-span-4'>
                        <h3 className="font-semibold text-2xl">{feature.title}</h3>
                        <p className='leading-8 mt-3'>{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeatureCardComponent;