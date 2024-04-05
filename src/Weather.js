import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "bootstrap/dist/css/bootstrap.min.css";
import dayBackground from "./images/day.jpg";
import nightBackground from "./images/night.jpg";

function Weather() {
  let [city, setCity] = useState("Miami");
  let [query, setQuery] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  let [forecastData, setForecastData] = useState(null);
  let [isDayTime, setIsDayTime] = useState(true);
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  let units = "imperial";

  useEffect(() => {
    const fetchWeatherAndForecast = async () => {
      try {
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        let weatherResponse = await fetch(weatherUrl);
        let weather = await weatherResponse.json();

        if (weather.coord) {
          let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
          let forecastResponse = await fetch(forecastUrl);
          let forecast = await forecastResponse.json();

          setWeatherData(weather);
          setForecastData(forecast.daily.slice(1, 6)); // Get the next 5 days
          determineDayOrNight(weather.sys.sunrise, weather.sys.sunset);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (city) {
      fetchWeatherAndForecast();
    }
  }, [city]);

  const determineDayOrNight = (sunrise, sunset) => {
    let currentTime = new Date().getTime() / 1000; // Current time in seconds
    setIsDayTime(currentTime >= sunrise && currentTime <= sunset);
  };

  const mapIcon = (iconCode) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      setCity(query);
      setQuery("");
    }
  };

  return (
    <div
      className="container weather-app"
      style={{
        background: isDayTime
          ? `url(${dayBackground})`
          : `url(${nightBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit} className="search-form row my-3">
        <div className="col-12 col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4 mt-2 mt-md-0">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="current-weather mb-4">
          <ReactAnimatedWeather
            icon={mapIcon(weatherData.weather[0].icon)}
            color="white"
            size={64}
            animate={true}
          />
          <h2 className="weather-city">{weatherData.name}</h2>
          <h3 className="weather-temp">
            {Math.round(weatherData.main.temp)}
            <div className="imperial">°F</div>
          </h3>
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
          <p className="weather-details">
            Humidity: {weatherData.main.humidity}% | Wind:{" "}
            {weatherData.wind.speed} km/h
          </p>
        </div>
      )}
      <div className="weekly-forecast row">
        {forecastData &&
          forecastData.map((day, index) => (
            <div
              key={index}
              className="forecast-item col-12 col-sm-6 col-md-4 col-lg-2"
            >
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
