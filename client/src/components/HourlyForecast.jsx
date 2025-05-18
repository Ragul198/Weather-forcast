import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';

const HourlyForecast = () => {
  const { forecast, loading, error } = useWeather();

  const prepareHourlyData = () => {
    if (!forecast?.forecast?.forecastday?.[0]?.hour) return [];

    const now = new Date();
    const currentHourIndex = now.getHours();

    return forecast.forecast.forecastday[0].hour
      .slice(currentHourIndex, currentHourIndex + 13)
      .map((hour, index) => ({
        time: index === 0 ? 'Now' : `${new Date(hour.time).getHours()}:00`,
        temp: hour.temp_c,
        rain: hour.chance_of_rain,
      }));
  };

  const hourlyData = prepareHourlyData();

  if (loading) return <div className="text-center py-4">Loading hourly data...</div>;
  if (error) return <div className="text-red-500 py-4">Error: {error}</div>;
  if (!hourlyData.length) return <div className="text-center py-4">No hourly data available</div>;

  return (
    <div className="flex flex-col text-center justify-center 
  w-full max-w-[95%] sm:w-[90%] md:w-[80%] 
  bg-white/80 backdrop-blur-md rounded-3xl p-4 sm:p-6 
  shadow-lg border border-gray-200 mx-auto dark:border-gray-700 dark:bg-gray-800/90">

      <h3 className="text-xl font-semibold mb-4 dark:text-white">12-hour forecast</h3>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: '% Rain', angle: -90, position: 'insideRight' }} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="right" dataKey="rain" fill="#60a5fa" name="Rain Chance" />
          <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} name="Temperature" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyForecast;
