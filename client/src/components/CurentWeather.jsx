import  { useState, useEffect } from 'react';
import { useWeather } from '../../context/WeatherContext.jsx';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GoChevronRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/cloudlogo.png';

const CurrentWeather = ({ minimal = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [previousWeather, setPreviousWeather] = useState(null);
  const [showInvalidLocation, setShowInvalidLocation] = useState(false);

  const navigate = useNavigate();
  const {
    currentWeather,
    loading,
    error,
    fetchWeather,
    location
  } = useWeather();
  useEffect(() => {
    if (currentWeather) {
      setPreviousWeather(currentWeather);
      setShowInvalidLocation(false); // Clear error notification if any
    }

    if (error) {
      setShowInvalidLocation(true); // Show "Invalid location" warning
    }
  }, [currentWeather, error]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
    }
  };

  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const weatherData = currentWeather || previousWeather;

  if (loading && !weatherData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${!minimal ? 'shadow-lg' : ''} ${minimal ? 'h-screen justify-center' : 'm-4 lg:m-10'} rounded-3xl lg:rounded-4xl p-5 lg:p-8 backdrop-blur-md bg-white/80 border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700`}>

      {/* Notification for Invalid Location */}
      {showInvalidLocation && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mb-4 border border-yellow-400 text-sm font-medium">
          ⚠️ Invalid location. Showing previous data.
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-20 w-full">
        {/* Left Section */}
        <div className="flex flex-col justify-between gap-6 lg:gap-20 w-full lg:w-auto">
          {/* Location */}
          <div className="weather-place flex flex-col gap-4">
            <div className="location flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors dark:hover:text-blue-400">
              <FaMapMarkerAlt className='text-2xl lg:text-3xl text-blue-500' />
              <h2 className='text-xl lg:text-2xl font-semibold'>
                {weatherData?.location?.name || 'N/A'}
              </h2>
              {!minimal && <GoChevronRight className='text-2xl lg:text-3xl' />}
            </div>  
            <h2 className='text-3xl lg:text-5xl font-bold capitalize dark:text-white'>
              {weatherData?.current?.condition?.text || 'N/A'}
            </h2>  
          </div>

          {/* Temperature and Date */}
          <div className="weather-details flex flex-col gap-1">
            <h2 className='text-4xl lg:text-6xl font-bold dark:text-white'>
              {weatherData?.current?.temp_c || '--'}°C
            </h2>
            <p className='text-xl lg:text-2xl text-gray-600 dark:text-gray-300'>
              {weatherData?.location?.localtime ? formatDate(weatherData.location.localtime) : 'N/A'}
            </p>
          </div>

          

          {/* Mobile Stats */}
          <div className={`grid grid-cols-2 gap-3 ${minimal ? 'lg:grid' : 'lg:hidden'} mt-4`}>
            <div className="bg-blue-50/50 p-3 rounded-xl dark:bg-gray-700/50">
              <p className="text-gray-500 text-sm dark:text-gray-300">Humidity</p>
              <p className="font-semibold dark:text-white">{weatherData?.current?.humidity || '--'}%</p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl dark:bg-gray-700/50">
              <p className="text-gray-500 text-sm dark:text-gray-300">Wind</p>
              <p className="font-semibold dark:text-white">{weatherData?.current?.wind_kph || '--'} km/h</p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl dark:bg-gray-700/50">
              <p className="text-gray-500 text-sm dark:text-gray-300">Feels Like</p>
              <p className="font-semibold dark:text-white">{weatherData?.current?.feelslike_c || '--'}°C</p>
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl dark:bg-gray-700/50">
              <p className="text-gray-500 text-sm dark:text-gray-300">Precipitation</p>
              <p className="font-semibold dark:text-white">{weatherData?.current?.precip_mm || '0'}mm</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        {!minimal && (
          <div className={`search mb-6 lg:mb-0 ${isSearchFocused ? 'lg:order-first' : ''}`}>
            <div className="search-bar bg-white p-2 lg:p-3 rounded-full flex items-center gap-2 shadow-md lg:shadow-sm border border-gray-200 lg:border-none dark:bg-gray-800 dark:border-gray-700">
              <FiSearch className='text-gray-500 text-xl lg:text-2xl ml-2' />
              <input 
                type="text" 
                placeholder='Search place...' 
                className='w-full outline-none border-none bg-transparent text-base lg:text-lg'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>
        )}

        {/* Logo & Desktop Stats */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-10">
          <div className="logo flex justify-center lg:justify-end">
            <img src={logo} alt="Weather Logo" className='w-16 lg:w-24' />
          </div>

          {!minimal && weatherData && (
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <p className="text-gray-500 text-sm">Humidity</p>
                <p className="font-semibold">{weatherData.current.humidity}%</p>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <p className="text-gray-500 text-sm">Wind</p>
                <p className="font-semibold">{weatherData.current.wind_kph} km/h</p>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <p className="text-gray-500 text-sm">Feels Like</p>
                <p className="font-semibold">{weatherData.current.feelslike_c}°C</p>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <p className="text-gray-500 text-sm">Precipitation</p>
                <p className="font-semibold">{weatherData.current.precip_mm}mm</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
