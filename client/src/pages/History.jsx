import React, { useState, useEffect } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiDayCloudy } from 'react-icons/wi';
import { FiClock, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const History = () => {
  const { history: apiHistory } = useWeather();
  const [showAll, setShowAll] = useState(false);
  const [formattedHistory, setFormattedHistory] = useState([]);

  // Weather condition icons mapping
  const weatherIcons = {
    'Sunny': <WiDaySunny className="text-yellow-500 text-4xl" />,
    'Clear': <WiDaySunny className="text-yellow-500 text-4xl" />,
    'Rain': <WiRain className="text-blue-500 text-4xl" />,
    'Cloudy': <WiCloudy className="text-gray-500 text-4xl" />,
    'Partly cloudy': <WiDayCloudy className="text-gray-400 text-4xl" />,
    'Thunderstorm': <WiThunderstorm className="text-purple-500 text-4xl" />,
    'Snow': <WiSnow className="text-blue-200 text-4xl" />,
    default: <WiDaySunny className="text-yellow-500 text-4xl" />
  };

  // Format API history data
  useEffect(() => {
    if (apiHistory && apiHistory.length > 0) {
      const formatted = apiHistory.map(item => {
        // Use the exact location name returned by the API
        const locationName = item.location || 'Unknown Location';
        const condition = item.condition || 'Clear';
        
        return {
          id: item._id || item.timestamp,
          location: locationName,
          condition: condition,
          icon: weatherIcons[condition] || weatherIcons.default,
          date: new Date(item.timestamp).toLocaleDateString(),
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });
      setFormattedHistory(formatted);
    }
  }, [apiHistory]);

  const displayedHistory = showAll ? formattedHistory : formattedHistory.slice(0, 5);

  if (!apiHistory) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-200">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 ">
      <div className="max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800/90">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Search History</h1>
        
        <div className="space-y-4">
          {displayedHistory.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-blue-100/80 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{item.location}</h2>
                  <p className="text-gray-600 capitalize dark:text-white">{item.condition}</p>
                </div>
              </div>
              <div className="text-right ">
                
                <div className="flex items-center justify-end space-x-1 text-gray-500 text-sm dark:text-gray-300">
                  <FiClock className="text-sm" />
                  <span>{item.date} at {item.time}</span> 
                </div>
              </div>
            </div>
          ))}
        </div>

        {formattedHistory.length > 5 && (
          <div className="mt-6 text-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center justify-center mx-auto px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showAll ? (
                <>
                  <FiChevronUp className="mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" />
                  Show More ({formattedHistory.length - 5} more)
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-gray-500">
          {formattedHistory.length === 0 ? (
            <p>No search history found</p>
          ) : (
            <p>Showing {displayedHistory.length} of {formattedHistory.length} searches</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;