  import React from 'react';
  import { useWeather } from '../../context/WeatherContext.jsx';
  import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiDayCloudy } from 'react-icons/wi';

  const DailyForecast = () => {
    const { forecast, loading, error } = useWeather();

    // Weather condition icons mapping
    const weatherIcons = {
      'Sunny': <WiDaySunny className="text-yellow-500 text-xl" />,
      'Clear': <WiDaySunny className="text-yellow-500 text-xl" />,
      'Partly cloudy': <WiDayCloudy className="text-gray-400 text-xl" />,
      'Cloudy': <WiCloudy className="text-gray-500 text-xl" />,
      'Overcast': <WiCloudy className="text-gray-600 text-xl" />,
      'Rain': <WiRain className="text-blue-500 text-xl" />,
      'Thunderstorm': <WiThunderstorm className="text-purple-500 text-xl" />,
      'Snow': <WiSnow className="text-blue-200 text-xl" />,
    };

    if (loading) return <div className="text-center py-4">Loading forecast...</div>;
    if (error) return <div className="text-red-500 py-4">Error: {error}</div>;

    return (
      <div className='lg:w-80 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700'>
        <h3 className='text-xl font-semibold mb-4'>5-day forecast</h3>
        <div className='space-y-4'>
          {forecast?.forecast?.forecastday?.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
            const condition = day.day.condition.text;
            
            return (
              <div key={index} className='flex justify-between items-center dark:text-white'>
                <span className='w-12 font-medium'>{dayName}</span>
                <span className='flex items-center gap-1 flex-1 capitalize'>
                  {weatherIcons[condition] || <WiDaySunny className="text-yellow-500 text-xl" />}
                  {condition}
                </span>
                
                <span className='w-12 text-right font-bold'>{day.day.avgtemp_c}°</span>
              </div>
            );
          })}
        </div>

        <div className='mt-8'>
          <h3 className='text-xl font-semibold mb-4 dark:text-white'>Air Conditions</h3>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-gray-500 text-sm dark:text-gray-300'>Actual Temperature</p>
              <p className='font-semibold dark:text-white'>{forecast?.current?.temp_c || '--'}°</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Wind Chillness</p>
              <p className='font-semibold'>{forecast?.current?.windchill_c || '--'}°</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Atmospheric Pressure</p>
              <p className='font-semibold'>{forecast?.current?.pressure_mb || '--'} mb</p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>UV Index</p>
              <p className='font-semibold'>{forecast?.current?.uv || '--'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default DailyForecast;