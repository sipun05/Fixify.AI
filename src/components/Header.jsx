import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import iithlogo from '../assests/iitlogo.jpg'; // Adjust the path as necessary
import  { useEffect } from 'react';    

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
 const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };

  const translations = [
  "MizuGuna",        // English
  "मिज़ुगुना",       // Hindi
  "ミズグナ",         // Japanese
  "ମିଜୁଗୁନା",       // Odia
  "మిజుగునా",       // Telugu
  "ಮಿಜುಗುನಾ",       // Kannada (optional)
  "மிசுகுனா"         // Tamil (optional)
];

const [index, setIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % translations.length);
  }, 1000); // 1000ms = 1 second

  return () => clearInterval(interval);
}, []);
const navItems = [
  { name: 'HOME', to: '/' },
  { name: 'ABOUT', to: '/about' },
  { name: 'INFO', to: '/info' },
  { name: 'GALLERY', to: '/gallery' },
  { name: 'CONTACT', to: '/contact' },
  { name: 'TRAINING', to: '/training' },
  { name: 'RESOURCES', to: '/resources' },
  
];


  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            
            <div className="flex flex-row items-center space-x-4">
  <img src={iithlogo} alt="IIT Logo" className="w-28 h-20 inline-block" />
  
   <div className="flex flex-col leading-tight">
    <span className="text-sm text-gray-700">వైద్య హైదరాబాదు</span>
    <span className="text-sm text-gray-700">आई आई टी हैदराबाद</span>
    <span className="text-sm font-semibold text-blue-800">IIT Hyderabad</span>
  </div>
    <span className="text-orange-500 text-2xl mx-10 font-bold">{translations[index]}</span>
  
</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
             <Link
  key={item.name}
  to={item.to}
  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 text-sm tracking-wide"
>
  {item.name}
</Link>

            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button  onClick={handleLoginClick}  className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
               <Link
  key={item.name}
  to={item.to}
  onClick={() => setIsMenuOpen(false)}
  className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors duration-200"
>
  {item.name}
</Link>

              ))}
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 mt-4 w-full">
                Login
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;