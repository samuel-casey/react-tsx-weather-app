import React from "react";

interface WeatherCardProps {
  city: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export const WeatherCard = (props: WeatherCardProps) => {
  let changeColor;

  if (props.temp && props.temp >= 90) {
    changeColor = "red";
  }

  if (props.temp && props.temp <= 40) {
    changeColor = "blue";
  }

  return (
    <div className="weather-card">
      <p>{props.city}</p>
      {/* <p>{props.country}</p> */}
      <h1 className={`${changeColor}`}>{props.temp}</h1>
      <h3>
        <em>{props.description}</em>
      </h3>
      <div className="min-max">
        <div className="min-or-max">
          <h4>Min:</h4>
          <p>{props.temp_min}</p>
        </div>
        <div className="min-or-max">
          <h4>Max:</h4>
          <p>{props.temp_max}</p>
        </div>
      </div>
    </div>
  );
};
