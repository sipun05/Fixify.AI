import React, { useState } from 'react';
import { useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // BookOpen is not used, so it can be removed
import { Link, useNavigate } from 'react-router-dom';
import IITH_symbol from '../assests/IITH_symbol.png'; // iithlogo is not used, so it can be removed

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInfoSubMenuOpen, setIsInfoSubMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/userlogin');
    };


     const onClickLogo = () => {
navigate('/')
 }

    const translations = [
        "MizuGuna",
        "మిజగునా",
        "ミズグナ",
        "ମିଜୁଗୁନା",
        "మిజుగునా",
        "ಮಿಜುಗುನಾ",
        "மிசுகுனா"
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
                    {/* Logo and Dynamic Text */}
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-row items-center space-x-4">
                            <img onClick={onClickLogo} src={IITH_symbol} alt="IIT Logo" className="max-w-16 max-h-16 inline-block" />
                            <div className="flex flex-col leading-tight">
                                <span onClick={onClickLogo} className="text-2xl font-semibold text-blue-800">IIT Hyderabad</span>
                            </div>
                            {/* Fixed width container for translations */}
                            <div className="w-40 text-center"> {/* Adjust w-40 as needed to fit the longest translation */}
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
                                            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 text-sm tracking-wide"
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
                                        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 text-sm tracking-wide"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Login Button */}
                    <div className="hidden md:block">
                        <button onClick={handleLoginClick} className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
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
                                <div key={item.name}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => setIsInfoSubMenuOpen(!isInfoSubMenuOpen)}
                                                className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors duration-200 w-full text-left"
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
                                            className="text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors duration-200"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <button onClick={handleLoginClick} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 mt-4 w-full">
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