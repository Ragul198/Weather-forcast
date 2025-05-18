const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Weather data endpoints
router.get('/current/:location', weatherController.getCurrentWeather);
router.get('/forecast/:location', weatherController.getWeatherForecast);
router.get('/history', weatherController.getSearchHistory);
router.post('/history', weatherController.saveSearch);

module.exports = router;