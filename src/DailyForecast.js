import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const Forecast = ({ daily }) => {
  const iconDefaults = {
    color: "goldenrod",
    size: 50,
    animate: true,
  };

  const getDayOfWeek = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  return (
    <div className="forecast">
      {daily.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>{getDayOfWeek(day.dt)}</p>
          <ReactAnimatedWeather
            icon={day.weather[0].icon.toUpperCase().replace(/-/g, "_")}
            color={iconDefaults.color}
            size={iconDefaults.size}
            animate={iconDefaults.animate}
          />
          <p>{Math.round(day.temp.day)}°F</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
