import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/public/home/Header';
import Navbar from '../../components/public/home/Navbar';
import TabBar from '../../components/public/features/TabBar';
import EmployeeTab from '../../components/public/features/EmployeeTab';
import Footer from '../../components/public/home/Footer';
import AdministrationTab from '../../components/public/features/AdministrationTab';
import PayrollTab from '../../components/public/features/PayrollTab';
import PortalTab from '../../components/public/features/PortalTab';
import ComplianceTab from '../../components/public/features/ComplianceTab';
import BenefitsTab from '../../components/public/features/BenefitsTab';

const Features = () => {
    return (
        <>
            <Header />
            <Navbar />
            <TabBar />
            <Routes>
                <Route path='/' element={<EmployeeTab />} />
                <Route path='/*' element={<EmployeeTab />} />
                <Route path='/employeetab' element={<EmployeeTab />} />
                <Route path='/administrationtab' element={<AdministrationTab />} />
                <Route path='/payrolltab' element={<PayrollTab />} />
                <Route path='/portaltab' element={<PortalTab />} />
                <Route path='/compiliancetab' element={<ComplianceTab />} />
                <Route path='/benefitstab' element={<BenefitsTab />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Features;