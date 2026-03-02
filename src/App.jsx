import { useState } from "react";

// Mapping of weather conditions to emoji icons (replace with SVG later if desired)
const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    setError("");

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
    } catch {
      setWeather(null);
      setError("City not found");
    }
  };

  return (
    <div className="app">
      <div className="weather-card">
        <h1>WeatherNow</h1>

        {/* Search bar */}
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {/* Error message */}
        {error && <p className="error">{error}</p>}

        {/* Weather results */}
        {weather && weather.main && (
          <>
            <h2>{weather.name}</h2>

            {/* Main weather icon */}
            <div className="icon">
              {weatherIcons[weather.weather[0].main] || "🌤️"}
            </div>

            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p className="condition">{weather.weather[0].description}</p>

            <div className="extra-info">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} km/h</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;