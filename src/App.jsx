import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import RuralDev from './components/RuralDev';
import Home from './components/Home';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
   

 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>




  );
}

export default App;