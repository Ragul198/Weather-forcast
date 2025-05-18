const axios = require('axios');
const Search = require('../models/Search');
const geoHelper = require('../utils/geoHelper');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

exports.fetchCurrentWeather = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch current weather data');
  }
};

exports.fetchWeatherForecast = async (location) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=5`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather forecast');
  }
};

exports.getSearchHistory = async () => {
  try {
    return await Search.find().sort({ createdAt: -1 }).limit(20);
  } catch (error) {
    throw new Error('Failed to read search history');
  }
};

exports.saveSearchToHistory = async (location) => {
  try {
    const newSearch = new Search({
      location
      
    });

    await newSearch.save();
    return newSearch;
  } catch (error) {
    console.error('MongoDB Save Error:', error);  // 🔍 Show the real error
    throw new Error('Failed to save search to history');
  }
};
