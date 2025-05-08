import Search from "../search";
import { useEffect, useState } from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`);
      const data = await response.json();
      console.log(data, "data");
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching weather data:", error);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    fetchWeatherData("Hanoi");
  }, []);

  return (
    <div>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData?.main?.temp}</div>
          <p className="description">{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}</p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
