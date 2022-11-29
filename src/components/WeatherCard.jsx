import React, { useEffect, useState } from "react";
import { BiMap } from "react-icons/bi";
import { TiWeatherWindy } from "react-icons/ti";
import { BsClouds } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";

export const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isTime, setIsTime] = useState("0");
  const [isDate, setIsDate] = useState("0");

  const currentTime = () => {
    const momentoActual = new Date();
    let hora = momentoActual.getHours();
    let minuto = momentoActual.getMinutes();
    let segundo = momentoActual.getSeconds();
    const horaImprimible = hora + " : " + minuto + " : " + segundo;

    setIsTime(horaImprimible);

    setTimeout(() => {
      currentTime();
    }, 1000);
  };

  const currentDate = () => {
    const momentoActual = new Date();
    let numberDate = momentoActual.getDate();
    let day = nameDay(momentoActual.getDay());
    let month = monthName(momentoActual.getMonth());
    let year = momentoActual.getFullYear();

    const date = day + ", " + month + " " + numberDate;
    setIsDate(date)
  };

  useEffect(() => {
    currentTime();
    currentDate();
  }, []);

  return (
    <article className="card">
      <header className="card__header">
        <h1 className="card__title">Weather App </h1>
      </header>
      <section className="card__icon-container">
        <div className="card__data-temp">
          <h2 className="card__subtitle">
            <BiMap className="card__icon-geo" /> {weather?.name}{" "}
            {weather?.sys.country}
          </h2>
          <h2 className="card__fecha">{isDate}</h2>

          <h2 className="hora-actual">{isTime}</h2>

          <div className="card__info">
            <ul className="card__list">
              <li className="card__item">
                <TiWeatherWindy />
                &nbsp;&nbsp;
                <span className="card__span">Wind Speed: </span>{" "}
                {weather?.wind.speed} m/s
              </li>
              <li className="card__item">
                <BsClouds />
                &nbsp;&nbsp;
                <span className="card__span">Clouds: </span>{" "}
                {weather?.clouds.all} %
              </li>
              <li className="card__item">
                <BsClockHistory />
                &nbsp;&nbsp;
                <span className="card__span">Pressures: </span>{" "}
                {weather?.main.pressure} hPa
              </li>
            </ul>
          </div>
        </div>

        <div className="icon-nube">
          <div className="grados">
            <h3 className="card__temp">
              {isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheid} °F`}
            </h3>

            <button
              className="card__btn"
              onClick={() => {
                setIsCelsius(!isCelsius);
              }}
            >
              {isCelsius ? "| °F" : "| °C"}
            </button>
          </div>

          <div className="div-nube">
            <img
              className="card-icon"
              src={
                weather &&
                `http://openweathermap.org//img/wn/${weather?.weather[0].icon}@4x.png`
              }
              alt=""
            ></img>
          </div>

          <h3 className="card__description">
            {weather?.weather[0].description}
          </h3>
        </div>
      </section>
      <footer className="card__footer"></footer>
    </article>
  );
};

function nameDay(index) {
  const week = [
    "Sun",
    "Mon",
    "Tues",
    "Wed",
    "Thurs",
    "Fri",
    "Sat"
  ];

  return week[index];
}

function monthName(index) {
  const week = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return week[index];
}


