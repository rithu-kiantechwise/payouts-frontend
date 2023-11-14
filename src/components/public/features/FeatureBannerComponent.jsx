import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../../redux/modalSlice';

const FeatureBannerComponent = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const triggerModal = () => {
        dispatch(openModal());
    }
    return (
        <div>
            {data.map((featureBanner, index) => (
                <div key={index} className='grid grid-cols-2'>
                    <div className='px-20 py-16'>
                        <h1 className='text-3xl font-bold leading-[2.5rem]'>{featureBanner.bannerHeading}</h1>
                        <h4 className='text-xl leading-[2rem] mt-4'>{featureBanner.bannerDescription}</h4>
                        <div className='grid grid-cols-2 gap-3 mt-14'>
                            <button onClick={() => navigate('/register')} className='lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded text-white font-bold bg-violet-500 '>Access kian payouts</button>
                            <button onClick={() => triggerModal()} className='lg:col-span-1 col-span-2 uppercase px-8 py-4 rounded border border-black '>Start a free trial</button>
                        </div>
                    </div>
                    <div className='shadow-lg'>
                        <img src={featureBanner.imageSrc} alt={featureBanner.imageAlt} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FeatureBannerComponent;