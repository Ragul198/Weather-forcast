const weatherService = require('../services/weatherService');

exports.getCurrentWeather = async (req, res) => {
  try {
    const { location } = req.params;
    const weatherData = await weatherService.fetchCurrentWeather(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWeatherForecast = async (req, res) => {
  try {
    const { location } = req.params;
    const forecastData = await weatherService.fetchWeatherForecast(location);
    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const history = await weatherService.getSearchHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveSearch = async (req, res) => {
  try {
    const { location  } = req.body;
    const savedSearch = await weatherService.saveSearchToHistory(location);
    res.json(savedSearch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};