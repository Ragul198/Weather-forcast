import React from 'react';
import { FaRunning, FaUmbrellaBeach, FaHiking, FaBiking, FaGamepad, FaBook } from 'react-icons/fa';
import { MdLocalMovies } from "react-icons/md";
import { GiNightSleep } from "react-icons/gi";
import { useWeather } from '../../context/WeatherContext'; // adjust path as needed

const Activities = () => {
  const { currentWeather } = useWeather();

  // Define activity options
  const outdoorActivities = [
    {
      id: 1,
      name: "Morning Run",
      type: "Running",
      icon: <FaRunning className="text-blue-500 text-xl" />,
      conditions: "Best in sunny weather"
    },
    {
      id: 2,
      name: "Beach Walk",
      type: "Walking",
      icon: <FaUmbrellaBeach className="text-yellow-500 text-xl" />,
      conditions: "Great when it's not raining"
    },
    {
      id: 3,
      name: "Mountain Hike",
      type: "Hiking",
      icon: <FaHiking className="text-green-500 text-xl" />,
      conditions: "Avoid during thunderstorms"
    },
    {
      id: 4,
      name: "Bike Trail",
      type: "Cycling",
      icon: <FaBiking className="text-red-500 text-xl" />,
      conditions: "Perfect in mild temperatures"
    }
  ];

  const indoorActivities = [
    {
      id: 5,
      name: "Video Gaming",
      type: "Indoor Fun",
      icon: <FaGamepad className="text-purple-500 text-xl" />,
      conditions: "Great for rainy or cold days"
    },
    {
      id: 6,
      name: "Reading Books",
      type: "Relaxation",
      icon: <FaBook className="text-orange-500 text-xl" />,
      conditions: "Perfect for staying cozy inside"
    },
    {
      id: 5,
      name: "Take a Nap",
      type: "Indoor Fun",
      icon: <GiNightSleep className="text-purple-500 text-xl" />,
      conditions: "Great for rainy or cold days"
    },
    {
      id: 6,
      name: "Watch a Anime",
      type: "Relaxation",
      icon: <MdLocalMovies className="text-orange-500 text-xl" />,
      conditions: "Perfect for staying cozy inside"
    }
  ];

  // Determine what to show based on weather
  const isRainy = currentWeather?.current?.condition?.text?.toLowerCase().includes('rain');
  const isCold = currentWeather?.current?.temp_c < 18; // You can adjust temperature threshold

  const recommendedActivities = isRainy || isCold ? indoorActivities : outdoorActivities;

  return (
    <div className="backdrop-blur-md rounded-3xl p-6 bg-white/80 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Recommended Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedActivities.map((activity) => (
          <div key={activity.id} className="flex items-start p-4 bg-blue-50/50 rounded-xl hover:bg-blue-100/50 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mr-4 mt-1">
              {activity.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{activity.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{activity.type}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.conditions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
