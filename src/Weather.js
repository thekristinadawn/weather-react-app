import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Weather() {
  let [city, setCity] = useState("Miami");
  let [query, setQuery] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  let [forecastData, setForecastData] = useState(null);
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let units = "metric";

  useEffect(() => {
    let fetchWeatherAndForecast = async () => {
      try {
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        let weatherResponse = await fetch(weatherUrl);
        let weather = await weatherResponse.json();
        setWeatherData(weather);

        let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
        let forecastResponse = await fetch(forecastUrl);
        let forecast = await forecastResponse.json();
        setForecastData(forecast.daily.slice(1, 6));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (city) {
      fetchWeatherAndForecast();
    }
  }, [city]);

  let mapIcon = (iconCode) => {
    let iconMap = {
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

  let handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      setCity(query);
      setQuery("");
    }
  };

  let convertCtoF = (celsius) => Math.round((celsius * 9) / 5 + 32);

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
          <h3>{convertCtoF(weatherData.main.temp)}°F</h3>
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
              <p>{convertCtoF(day.temp.day)}°F</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Weather;
