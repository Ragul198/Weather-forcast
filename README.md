# WeatherApp

A full-stack weather application that provides current weather conditions, 5-day forecast, hourly forecast, weather alerts, and search history.

## Demo

[https://weather-app-fullstack.herokuapp.com/](https://weather-app-fullstack.herokuapp.com/)

## Features

* Current weather conditions
* 5-day forecast
* Hourly forecast
* Weather alerts
* Search history
* Responsive design

## APIs Used

* [OpenWeatherMap API](https://openweathermap.org/api)
* [GeoNames API](https://www.geonames.org/export/ws-overview.html)

## Packages Used

* React
* React Router
* Tailwind CSS
* Axios
* Mongoose
* dotenv
* Express
* Cors
* Nodemon
* React-icons
* recharts

## Setup

1. Clone the repository
2. Install dependencies by running `npm install`
3. Create a `.env` file with the following variables:
	* `WEATHER_API_KEY` (OpenWeatherMap API key)
	* `GEO_API_KEY` (GeoNames API key)
	* `MONGO_URI` (MongoDB connection string)
	* `JWT_SECRET` (JSON Web Token secret)
4. Run `npm run dev` to start the server and client in development mode
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action

## Environment Variables

* `WEATHER_API_KEY`: OpenWeatherMap API key
* `GEO_API_KEY`: GeoNames API key
* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: JSON Web Token secret

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
