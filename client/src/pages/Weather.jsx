import React from 'react'
import CurrentWeather from '../components/CurentWeather'
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
const Weather = () => {
  return (
    <div>
        <CurrentWeather />
         {/* Bottom Section - Forecasts */}
      <div className='flex flex-col lg:flex-row m-4 lg:m-10 gap-6'>
        <HourlyForecast />
        <DailyForecast />
      </div>
    </div>
  )
}

export default Weather