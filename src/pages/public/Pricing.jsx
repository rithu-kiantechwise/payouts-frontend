import React from 'react'
import Header from '../../components/public/home/Header';
import Navbar from '../../components/public/home/Navbar';
import Footer from '../../components/public/home/Footer';
import PriceDetails from '../../components/public/pricing/PriceDetails';
import FAQ from '../../components/public/pricing/FAQ';
import Enroll from '../../components/public/pricing/Enroll';

const Pricing = () => {
    return (
        <>
            <Header />
            <Navbar />
            <PriceDetails />
            <FAQ/>
            <Enroll/>
            <Footer />
        </>
    )
}

export default Pricing;