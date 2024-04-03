import React, { useState, useEffect } from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Weather({ defaultCity }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // Define forecastData in state
  const apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
  const units = "imperial";

  useEffect(() => {
    const fetchWeatherAndForecast = async () => {
      try {
        // Fetch current weather to get city coordinates
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=${units}`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        // Use coordinates to fetch forecast data using One Call API
        const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData.daily); // Assume you want daily forecast data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeatherAndForecast();
  }, [defaultCity]);

  // Map OpenWeatherMap icons to ReactAnimatedWeather icons
  const mapIcon = (iconCode) => {
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
    return iconMap[iconCode] || "CLEAR_DAY"; // Default to 'CLEAR_DAY' if no match is found
  };

  if (!weatherData || !forecastData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Current Weather in {weatherData.name}</h2>
      <ReactAnimatedWeather
        icon={mapIcon(weatherData.weather[0].icon)}
        color="goldenrod"
        size={64}
        animate={true}
      />
      <p>Temperature: {Math.round(weatherData.main.temp)}°F</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind: {weatherData.wind.speed}km/h</p>
      <div>
        <h2>Weekly Forecast</h2>
        {forecastData.map((day, index) => {
          // Convert the timestamp to a Date object
          const date = new Date(day.dt * 1000);
          // Format the date as "Day of the Week, Month Day"
          const options = { weekday: "long", month: "short", day: "numeric" };
          const dateString = date.toLocaleDateString("en-US", options);

          return (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p>
                {dateString}: {Math.round(day.temp.day)}°F -{" "}
                {day.weather[0].description}
                <ReactAnimatedWeather
                  icon={mapIcon(day.weather[0].icon)}
                  color="goldenrod"
                  size={64}
                  animate={true}
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
