import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

import Header from './components/Header'; // Ensure this path is correct
import Hero from './components/Hero'; // (Not used in routes, consider if needed elsewhere)
import Features from './components/Features'; // (Not used in routes, consider if needed elsewhere)
import RuralDev from './components/RuralDev'; // (Not used in routes, consider if needed elsewhere)
import Home from './components/Home';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion"; // Corrected import for motion
import Gallery from './components/Gallery';
import Info from './components/Info';
import { ClerkProvider, SignUp } from '@clerk/clerk-react';
import TrainingPage from './components/TrainingPage';
import DashboardTable from './components/DashboardTable';
import Graph from './components/Graph';
import SignInNew from './components/SignInNew';
import SignUpp from './components/SignUpp';
import About from './components/About';




function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  return (
    
      <BrowserRouter>
        {/* Render the Header component here, outside of Routes */}
        <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/info" element={<Info />} />
          <Route path="/training" element={<TrainingPage />} />
         <Route
  path="/dashboard"
  element={isAuthenticated ? <DashboardTable /> : <Navigate to="/login" />}
/>
          <Route path="/graph" element={<Graph />} />
          <Route path="/signnew" element={<SignInNew />} />
          <Route  path='signupp' element={<SignUpp/>}/>
          <Route path='/about' element={<About />} />
          {/* Add routes for other pages like About, Contact, Resources if you have them */}
          {/* Example: */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/resources" element={<Resources />} /> */}
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;