import React, { useState ,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCloud, FiClock, FiInfo, FiX, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  useEffect(()=>{
    const savedTheme = localStorage.getItem('theme');
    const systemPefersDark = window.matchMedia('./prefers-color-scheme: dark)').matches
    if (savedTheme) {
        setTheme(savedTheme);
    }else if (systemPefersDark){
        setTheme
    }
} ,[]);
useEffect(()=>{
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
},[theme]);
const toggleTheme = () =>{
    setTheme(theme == 'light' ? 'dark' : 'light');
};

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Title */}
          <div className="flex-shrink-0">
            <h1 onClick={()=>{navigate('/')}} className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer">WeatherApp</h1>
          </div>

          {/* Middle - Navigation Links (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 ' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-400'
              }`}
            >
              <FiHome className="mr-1" />
              Home
            </Link>
            <Link
              to="/weather-info"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/weather-info') 
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-400'
              }`}
            >
              <FiCloud className="mr-1" />
              Weather
            </Link>
            <Link
              to="/search-history"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/search-history') 
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-400'
              }`}
            >
              <FiClock className="mr-1" />
              History
            </Link>
            <Link
              to="/about"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                isActive('/about') 
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-400'
              }`}
            >
              <FiInfo className="mr-1" />
              About
            </Link>
          </div>

            <button className='text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-400' onClick={toggleTheme}>Dark Mode</button>
          {/* Right side - Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
              alt="Weather App Logo"
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-400"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
          >
            <FiHome className="inline mr-2" />
            Home
          </Link>
          <Link
            to="/weather-info"
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/weather-info') 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'  
            }`}
          >
            <FiCloud className="inline mr-2" />
            Weather
          </Link>
          <Link
            to="/search-history"
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/search-history') 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
          >
            <FiClock className="inline mr-2" />
            History
          </Link>
          <Link
            to="/about"
            onClick={toggleMobileMenu}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-600 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
          >
            <FiInfo className="inline mr-2" />
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;