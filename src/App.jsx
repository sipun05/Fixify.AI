import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Login from './components/Login';
import TechnicianDashboard from './components/Technician';
import FixifyAdminDashboard from './components/Admin';
import FixifyUserDashboard from './components/User';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → landing page */}
        <Route path="/" element={<FixifyUserDashboard/>} />

        {/* Auth/Login page */}
        <Route path="/auth" element={<Login />} />

        {/* Role-based dashboards */}
        <Route path="/user-dashboard" element={<FixifyUserDashboard />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard/>} />
        <Route path="/user-dashboard" element={<FixifyAdminDashboard/>} />
        <Route path="/admin-dashboard" element={<FixifyUserDashboard />} />

        {/* Optional: Catch-all route to redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
