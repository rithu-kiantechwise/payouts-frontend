import React from 'react'
import Header from '../../components/public/home/Header';
import Navbar from '../../components/public/home/Navbar';
import Footer from '../../components/public/home/Footer';
import BannerHelp from '../../components/public/help/BannerHelp';
import HeroHelpSection from '../../components/public/help/HeroHelpSection';

const Help = () => {
    return (
        <>
            <Header />
            <Navbar />
            <BannerHelp />
            <HeroHelpSection />
            <Footer />
        </>
    )
}

export default Help;