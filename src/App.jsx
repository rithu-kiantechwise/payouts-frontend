import React from 'react'
import Registration from './components/auth/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Integrations from './pages/Integrations';
import Help from './pages/Help';

const App = () => {
  return (
    <BrowserRouter>
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