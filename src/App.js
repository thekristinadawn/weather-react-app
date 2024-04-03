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
            and is{" "}
            <a
              href="https://github.com/thekristinadawn/weather-react-app"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              open-sourced on GitHub
            </a>{" "}
            and hosted on Netlify
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
