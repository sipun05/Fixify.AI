import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import IITH_symbol from '../assests/IITH_symbol.png';
import Cookies from 'js-cookie';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoSubMenuOpen, setIsInfoSubMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/userlogin');
  };

  const handleLogoutClick = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    navigate('/userlogin');
  };

  const onClickLogo = () => {
    navigate('/');
  };

  const translations = [
    "MizuGuna", "మిజగునా", "ミズグナ", "ମିଜୁଗୁନା", "మిజుగునా", "ಮಿಜುಗುನಾ", "மிசுகுனா"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % translations.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'HOME', to: '/' },
    { name: 'ABOUT', to: '/about' },
    {
      name: 'INFO',
      to: '#',
      submenu: [
        { name: 'Fish Farming', to: '/info' },
        { name: 'Training', to: '/training' }
      ]
    },
    { name: 'GALLERY', to: '/gallery' },
    { name: 'CONTACT', to: '/contact' },
    { name: 'RESOURCES', to: '/resources' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-row items-center space-x-4">
              <img onClick={onClickLogo} src={IITH_symbol} alt="IIT Logo" className="max-w-16 max-h-16 inline-block cursor-pointer" />
              <div className="flex flex-col leading-tight">
                <span onClick={onClickLogo} className="text-2xl font-semibold text-blue-800 cursor-pointer">IIT Hyderabad</span>
              </div>
              <div className="w-40 text-center">
                <span className="text-orange-500 text-2xl font-bold block">{translations[index]}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setIsInfoSubMenuOpen(!isInfoSubMenuOpen)}
                      className="text-gray-700 hover:text-indigo-600 font-medium text-sm"
                    >
                      {item.name}
                    </button>
                    {isInfoSubMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.to}
                            onClick={() => setIsInfoSubMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className="text-gray-700 hover:text-indigo-600 font-medium text-sm"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <button
                onClick={handleLogoutClick}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 hover:text-white"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => setIsInfoSubMenuOpen(!isInfoSubMenuOpen)}
                        className="text-gray-700 hover:text-indigo-600 font-medium py-2 w-full text-left"
                      >
                        {item.name}
                      </button>
                      {isInfoSubMenuOpen && (
                        <div className="pl-4 flex flex-col">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.to}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsInfoSubMenuOpen(false);
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-indigo-600 font-medium py-2"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Auth Button (Mobile) */}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogoutClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 mt-4 w-full"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleLoginClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 mt-4 w-full"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
