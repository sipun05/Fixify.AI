// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './components/Home';
// import UserLogin from './components/UserLogin';
// import Gallery from './components/Gallery';
// import Info from './components/Info';
// import TrainingPage from './components/TrainingPage';
// import DashboardTable from './components/DashboardTable';
// import Graph from './components/Graph';
// import Contact from './components/Contact';
// import SignUpp from './components/SignUpp';
// import About from './components/About';
// import Resources from './components/Resources';

// function App() {
//     // isAuthenticated state is managed here, at the top level
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     return (
//         <BrowserRouter>
//             {/* Header is rendered on all pages */}
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 {/* UserLogin component now receives setIsAuthenticated as a prop */}
//                 <Route
//                     path="/userlogin"
//                     element={<UserLogin setIsAuthenticated={setIsAuthenticated} />}
//                 />
//                 <Route path="/gallery" element={<Gallery />} />
//                 <Route path="/info" element={<Info />} />
//                 <Route path="/training" element={<TrainingPage />} />
//                 <Route path="/contact" element={<Contact />} />
//                 {/* Protected Dashboard route: navigate to login if not authenticated */}
//                 <Route
//                     path="/dashboard"
//                     element={isAuthenticated ? <DashboardTable /> : <Navigate to="/userlogin" />}
//                 />
//                 <Route path="/graph" element={<Graph />} />
//                 {/* SignUpp component for new registrations */}
//                 <Route path="/signupp" element={<SignUpp />} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/resources" element={<Resources />} />
//                 {/* Duplicate contact route removed, keeping the first one */}
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import Gallery from './components/Gallery';
import Info from './components/Info';
import TrainingPage from './components/TrainingPage';
import DashboardTable from './components/DashboardTable';
import Graph from './components/Graph';

import SignUpp from './components/SignUpp';
import Contact from './components/Contact';
import About from './components/About';
import Resources from './components/Resources';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('authToken'); // persistent login
  });

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Routes */}
        <Route
          path="/userlogin"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" />
              : <UserLogin setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/userlogin"
          element={<Navigate to="/userlogin" />}
        />
        <Route path="/signupp" element={<SignUpp />} />
        

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <DashboardTable />
              : <Navigate to="/login" />
          }
        />

        {/* Public Routes */}
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/info" element={<Info />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;