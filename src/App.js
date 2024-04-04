import React from "react";
import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="Container">
        <div className="app-wrapper">
          <Weather defaultCity="Destin" />
          <footer>
            This project was coded by {""}
            <a
              href="https://github.com/thekristinadawn"
              target="_blank"
              rel="noreferrer"
            >
              Kristina Dawn
            </a>{" "}
            and is open-sourced on{" "}
            <a
              href="https://github.com/thekristinadawn/weather-react-app"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>{" "}
            hosted on
            <a
              href="https://forecasted-react-weather.netlify.app/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Netlify
            </a>{" "}
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
