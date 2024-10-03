import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherData, setWeatherData] = useState([]); // State for graph data

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city !== "[object Object]" ? city : query}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        updateWeatherData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setWeather({});
        setQuery("");
        setError({ message: "Not Found", query: city });
      });
  };

  const updateWeatherData = (data) => {
    const newData = {
      timestamp: new Date().toLocaleTimeString(),
      temperature: Math.round(data.main.temp),
      windSpeed: Math.round(data.wind.speed),
    };
    setWeatherData((prevData) => [...prevData, newData]);
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
  <div>
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="search-button" onClick={() => search(query)}>
            Search
          </button>
        </div>
        <ul>
          {weather.main ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility / 1609)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
      </div>
      <div >
      {weatherData.length > 0 && (
        <div>
        <h4 style={{ color: 'white' }}>---------</h4>
        <LineChart
          width={600}
          height={300}
          data={weatherData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#8884d8" 
            strokeWidth={2} 
            activeDot={{ r: 8 }} 
          />
          <Line 
            type="monotone" 
            dataKey="windSpeed" 
            stroke="#82ca9d" 
            strokeWidth={2} 
          />
        </LineChart>
      </div>
            )}
    </div>
    </div>
  );
}

export default Forcast;
