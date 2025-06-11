import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import RuralDev from './components/RuralDev';
import Home from './components/Home';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from "motion/react"
import Gallery from './components/Gallery';
import Info from './components/Info';
function App() {
  return (
   

 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
         <Route path="/gallery" element={<Gallery />} />
         <Route path="/info" element={<Info />} />
         
      
      </Routes>
    </BrowserRouter>




  );
}

export default App;