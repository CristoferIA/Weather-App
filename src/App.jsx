import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherCard } from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  const succes = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "b841754bf7aa61f575f4c3e2cb867327";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(0);
          const farenheid = (celsius * (9 / 5) + 32).toFixed(0);
          setTemp({
            celsius,
            farenheid
          });
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      <div className='App__image'></div>
      <WeatherCard 
        weather={weather}
        temp = {temp}
        ></WeatherCard>
    </div>
  );
}

export default App;
