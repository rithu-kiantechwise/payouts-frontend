import React from 'react'
import Header from '../../components/public/home/Header';
import Navbar from '../../components/public/home/Navbar';
import Hero from '../../components/public/home/Hero';
import Customer from '../../components/public/home/Customer';
import Experience from '../../components/public/home/Experience';
import Pricing from '../../components/public/home/Pricing';
import Demo from '../../components/public/home/Demo';
import Footer from '../../components/public/home/Footer';
import Banner from '../../components/public/home/Banner';

const Home = () => {

    return (
        <>
            <Header />
            <Navbar />
            <Hero />
            <Customer />
            <Experience />
            <Banner />
            <Pricing />
            <Demo />
            <Footer />
        </>
    )
}

export default Home;