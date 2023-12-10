import React from 'react'
import Header from '../../components/public/home/Header'
import Navbar from '../../components/public/home/Navbar'
import Footer from '../../components/public/home/Footer'
import TrustedBanking from '../../components/public/Integrations/TrustedBanking'
import IntegrationHero from '../../components/public/Integrations/IntegrationHero'

const Integrations = () => {
    return (
        <>
            <Header />
            <Navbar />
            <TrustedBanking />
            <IntegrationHero />
            <Footer />
        </>
    )
}

export default Integrations;