import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Weather() {
  const [city, setCity] = useState("New York"); // Default city
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  const units = "imperial";

  useEffect(() => {
    const fetchWeatherAndForecast = async () => {
      try {
        // Fetch weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        const weatherResponse = await fetch(weatherUrl);
        const weather = await weatherResponse.json();
        setWeatherData(weather);

        // Fetch forecast data using coordinates
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecast = await forecastResponse.json();
        setForecastData(forecast.daily.slice(1, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (city) {
      fetchWeatherAndForecast();
    }
  }, [city]);

  const mapIcon = (iconCode) => {
    // Map OpenWeatherMap icons to ReactAnimatedWeather icons
    // Add or modify the mappings as needed
    const iconMap = {
      "01d": "CLEAR_DAY",
      "01n": "CLEAR_NIGHT",
      "02d": "PARTLY_CLOUDY_DAY",
      "02n": "PARTLY_CLOUDY_NIGHT",
      "03d": "CLOUDY",
      "03n": "CLOUDY",
      "04d": "CLOUDY",
      "04n": "CLOUDY",
      "09d": "RAIN",
      "09n": "RAIN",
      "10d": "RAIN",
      "10n": "RAIN",
      "11d": "RAIN",
      "11n": "RAIN",
      "13d": "SNOW",
      "13n": "SNOW",
      "50d": "FOG",
      "50n": "FOG",
    };
    return iconMap[iconCode] || "CLEAR_DAY";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      setCity(query);
      setQuery("");
    }
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Submit
        </button>
      </form>
      {weatherData && (
        <div className="current-weather">
          <ReactAnimatedWeather
            icon={mapIcon(weatherData.weather[0].icon)}
            color="goldenrod"
            size={64}
            animate={true}
          />
          <h2>{weatherData.name}</h2>
          <h3>{Math.round(weatherData.main.temp)}°F</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>
            Humidity: {weatherData.main.humidity}% | Wind:{" "}
            {weatherData.wind.speed} km/h
          </p>
        </div>
      )}
      <div className="weekly-forecast">
        {forecastData &&
          forecastData.map((day, index) => (
            <div key={index} className="forecast-item">
              <p>
                {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <ReactAnimatedWeather
                icon={mapIcon(day.weather[0].icon)}
                color="goldenrod"
                size={48}
                animate={true}
              />
              <p>{Math.round(day.temp.day)}°F</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Weather;
