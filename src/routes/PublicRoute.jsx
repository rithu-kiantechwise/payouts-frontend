import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import DemoModal from '../components/public/DemoModal';
import Home from '../pages/public/Home';
import Features from '../pages/public/Features';
import Pricing from '../pages/public/Pricing';
import Integrations from '../pages/public/Integrations';
import Help from '../pages/public/Help';

const PublicRoute = () => {
    const { isOpen } = useSelector((state) => state.modal);

    return (
        <>
            {isOpen && <DemoModal />}
            <Routes>
                <Route path='/*' element={<Home />} />
                <Route path='/features/*' element={<Features />} />
                <Route path='/pricing/*' element={<Pricing />} />
                <Route path='/integrations/*' element={<Integrations />} />
                <Route path='/help/*' element={<Help />} />
            </Routes>
        </>
    )
}

export default PublicRoute;