import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return; // prevent empty search

    try {
      const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=116004ad9b78ebb0fbf7285c57ccb5da`
);

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (data.cod !== 200) {
        setError(data.message); // show error if city not found
        setWeather(null);
        return;
      }

      setWeather(data);
      setError(""); // clear previous errors
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Weather App 🌦️</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />

      <button onClick={fetchWeather} style={{ padding: "0.5rem" }}>
        Search
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {weather && weather.main && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
