import React from 'react';
import { FaCloudSunRain, FaMapMarkerAlt, FaHistory, FaChartLine, FaMobileAlt, FaServer } from 'react-icons/fa';
import { FiClock, FiRefreshCw } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800/90">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">About WeatherApp</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-white">Welcome to WeatherApp</h2>
          <p className="text-gray-700 mb-4 dark:text-gray-300">
            WeatherApp provides accurate, real-time weather forecasts for locations worldwide. 
            Our mission is to help you plan your day with confidence using the most reliable 
            weather data available.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you're planning a trip, scheduling outdoor activities, or just curious about 
            the weather in another part of the world, WeatherApp has you covered.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature Cards */}
            <div className="bg-blue-50/50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center mb-2">
                <FaCloudSunRain className="text-blue-500 text-2xl mr-3 dark:text-white" />
                <h3 className="text-xl font-medium">Current Weather</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time weather conditions including temperature, humidity, wind speed, 
                and precipitation for any location.
              </p>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-blue-500 text-2xl mr-3 dark:text-white" />
                <h3 className="text-xl font-medium">Location Search</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Search for weather in any city worldwide. Our intelligent search helps you 
                find locations quickly and accurately.
              </p>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center mb-2">
                <FaHistory className="text-blue-500 text-2xl mr-3 dark:text-white" />
                <h3 className="text-xl font-medium">Search History</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your recently searched locations are saved for quick access. Never lose track 
                of places you frequently check.
              </p>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-lg dark:bg-gray-700">
              <div className="flex items-center mb-2">
                <FaChartLine className="text-blue-500 text-2xl mr-3 dark:text-white" />
                <h3 className="text-xl font-medium">Detailed Forecasts</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                View hourly and 5-day forecasts with comprehensive weather data to help you 
                plan ahead with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-white">Weather API</h2>
          <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
            <div className="flex items-center mb-3">
              <FaServer className="text-blue-500 text-2xl mr-3 dark:text-white" />
              <h3 className="text-xl font-medium">Powered by WeatherAPI.com</h3>
            </div>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
              Our application uses the reliable WeatherAPI.com service to provide accurate 
              weather data for locations worldwide. This API offers:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <FiRefreshCw className="text-blue-400 mr-2 mt-1 flex-shrink-0 dark:text-white" />
                <span className='dark:text-white'>Real-time weather updates (refreshed every 15 minutes)</span>
              </li>
              <li className="flex items-start">
                <FiClock className="text-blue-400 mr-2 mt-1 flex-shrink-0 dark:text-white" />
                <span className='dark:text-white'>Historical weather data and future forecasts</span>
              </li>
              <li className="flex items-start">
                <FaMobileAlt className="text-blue-400 mr-2 mt-1 flex-shrink-0 dark:text-white" />
                <span className='dark:text-white'>Global coverage with data for over 2 million locations</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 rounded dark:bg-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>API Documentation:</strong> For developers interested in our weather data 
                sources, please visit <a href="https://www.weatherapi.com/docs/" className="text-blue-600 hover:underline dark:text-white">weatherapi.com/docs</a>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-white">Our Team</h2>
          <p className="text-gray-700 dark:text-gray-300">
            WeatherApp is developed by a passionate team of weather enthusiasts and software 
            developers dedicated to creating the most user-friendly and accurate weather 
            application available.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8 dark:text-gray-300">
          <p>© {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default About;