import React from 'react'

const CardComponent = (props) => {
    const { data } = props;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-[80%] m-auto">
            {data.map((feature, index) => (
                <div key={index} className="flex px-16 py-6 border bg-violet-50">
                    <div className='min-w-[18%]'>
                        <img src={feature.imageSrc} alt={feature.imageAlt} className="h-16 mb-4" />
                    </div>
                    <div className=''>
                        <h3 className="font-semibold text-2xl">{feature.title}</h3>
                        <p className='leading-8 mt-3'>{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardComponent;