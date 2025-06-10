import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
 const handleLoginClick = () => {
    navigate('/login'); // Redirects to the login page
  };


  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'INFO', href: '#info' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="text-orange-600 font-bold text-lg">MizuGuna</div>
              <div className="text-xs text-gray-600 leading-tight">
                <span className="block">वायबे हैंडरमासूं</span>
                <span className="block">आई आई टी हैदराबाद</span>
                <span className="block text-gray-500">IIT Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 text-sm tracking-wide"
              >
                {item.name}
              </a>
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
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
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