import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {

  
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [darkMode, setDarkMode] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [test, setTest] = useState('test');

  // Fetch current weather
  const fetchCurrentWeather = async (loc) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/current/${loc}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to fetch current weather');
    }
  };

  // Fetch weather forecast
  const fetchWeatherForecast = async (loc) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/forecast/${loc}`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to fetch forecast');
    }
  };

  // Get search history
  const getSearchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || 'Failed to fetch history');
    }
  };

  // Save search to history
  const saveSearch = async (loc) => {
    try {
      await axios.post(`${API_BASE_URL}/history`, { location: loc });
    } catch (err) {
      console.error('Error saving search:', err);
    }
  };

  // Main function to fetch all weather data
  const fetchWeather = async (loc) => {
    if (!loc) return;
    
    setLoading(true);
    setError(null);
    try {
      const [current, fiveDayForecast] = await Promise.all([
        fetchCurrentWeather(loc),
        fetchWeatherForecast(loc)
      ]);
      
      setCurrentWeather(current);
      setForecast(fiveDayForecast);
      setLocation(loc);
      
      await saveSearch(loc);
      const updatedHistory = await getSearchHistory();
      setHistory(updatedHistory);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load search history
  const loadHistory = async () => {
    try {
      const historyData = await getSearchHistory();
      setHistory(historyData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Initial load
 useEffect(() => {
  loadHistory();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${latitude},${longitude}`
          );
          if (res.data.length > 0) {
            const loc = res.data[0].name;
            fetchWeather(loc);
          }
        } catch (err) {
          console.error('Error in reverse geocoding:', err);
          fetchWeather('New York'); // fallback
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        fetchWeather('New York'); // fallback
      }
    );
  } else {
    fetchWeather('New York'); // fallback if not supported
  }
}, []);




  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        history,
        loading,
        error,
        location,
        fetchWeather,
        test,
        refreshHistory: loadHistory
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};