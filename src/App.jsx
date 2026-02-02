import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    setError("");
    setWeather(null);

     try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="app">
    <div className="card">
      <h1>WeatherNow 🌦️</h1>
      <p>Simple weather app built with React</p>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>
{error && <p className="error">{error}</p>}

      {weather && weather.main && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="condition">
            {weather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  </div>
);

}

export default App;
