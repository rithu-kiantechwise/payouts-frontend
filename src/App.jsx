import React from 'react'
import Registration from './pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Integrations from './pages/Integrations';
import Help from './pages/Help';
import DemoModal from './components/public/DemoModal';
import { useSelector } from 'react-redux';

const App = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <BrowserRouter>
      {isOpen && <DemoModal />}
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/features/*' element={<Features />} />
        <Route path='/pricing/*' element={<Pricing />} />
        <Route path='/integrations/*' element={<Integrations />} />
        <Route path='/help/*' element={<Help />} />
        <Route path='/register/*' element={<Registration />} />
        <Route path='/login/*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;