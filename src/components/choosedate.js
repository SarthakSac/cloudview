import React, { useState, useEffect } from 'react';
import { GEO_API_URL} from "../api";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/history.json?key=56c62f6298mshd8aea3ec1668383p135262jsne83e7778130f&q=${GEO_API_URL}/cities&dt=${startDate}&end_dt=${endDate}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    if (startDate && endDate) {
      fetchWeatherData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      {weatherData.length > 0 ? (
        <div>
          <h2>Weather Data</h2>
          <ul>
            {weatherData.map((data, index) => (
              <li key={index}>
                Date: {data.date}, Temperature: {data.temp_c}°C, Condition: {data.condition.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherComponent;
