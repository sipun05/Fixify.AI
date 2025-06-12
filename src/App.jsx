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
import { ClerkProvider } from '@clerk/clerk-react';
import TrainingPage from './components/TrainingPage';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
function App() {
  return (
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />

         <Route path="/gallery" element={<Gallery />} />
         <Route path="/info" element={<Info />} />
         <Route path="/training" element={<TrainingPage />}/>
       </Routes>
    </BrowserRouter>
  </ClerkProvider>
  );
}

export default App;