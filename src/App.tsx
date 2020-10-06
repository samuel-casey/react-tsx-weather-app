import React, { useState, SyntheticEvent } from "react";
import { Form } from "./Components/Form";
import { WeatherCard } from "./Components/WeatherCard";
import "./App.css";

// interfaces & types
interface IPlaceProps {
  city?: string;
  img?: string;
  temp?: number;
  temp_min?: number;
  temp_max?: number;
  description?: string;
}

function App() {
  const [place, setPlace] = useState<IPlaceProps>({
    city: "",
    img: "http://openweathermap.org/img/wn/10d@2x.png",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    description: ""
  });
  const [searched, setSearched] = useState(false);

  // HANDLE FORM SUBMIT and pass inputted zipcode to API
  const handleSubmit = async (zip: string, countryCode: string) => {
    console.log("zip,cc - ", zip, countryCode);

    // FETCH DATA FROM API with .then and .catch

    // USED THIS Stack Overflow as a guide for switching from async/await to .then() in order to throw an alert for errors
    // https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
    function apiCall(): Promise<any> {
      let openWeatherAPI: string = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&units=imperial&appid=8f02608638b1891744e6b2750a862506`;

      return fetch(openWeatherAPI)
        .then((response) => {
          const body = response.json();
          return body;
        })
        .catch((err: Error) => alert(err.message));
    }
    // CONSUME API CALL
    apiCall()
      .then((data) => {
        setSearched(true);

        let weatherImgCode: string = mapWeatherImgCode(
          data.weather[0].description
        );

        setPlace({
          city: data.name,
          temp: data.main.temp,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          description: data.weather[0].description,
          img: `http://openweathermap.org/img/wn/${weatherImgCode}@2x.png`
        });
      })
      .catch((err: Error) =>
        alert(
          "Please check that your zipcode AND country code are correct.\n\n**This app works best for US and Puerto-Rico Zipcodes"
        )
      );
  };

  const card =
    searched === true ? (
      <>
        <img src={place.img} alt="weather-img" />
        <WeatherCard
          city={place.city}
          temp={place.temp}
          temp_min={place.temp_min}
          temp_max={place.temp_max}
          description={place.description}
        />
      </>
    ) : null;

  return (
    <div className="App">
      <h1>What's the weather like?</h1>
      <Form handleSubmit={handleSubmit} />
      {card}
    </div>
  );
}

export default App;

// FUNCTION TO MAP WEATHER DESCRIPTIONS TO WEATHER IMG CODES THAT CAN BE FOUND HERE:
// https://openweathermap.org/weather-conditions
function mapWeatherImgCode(toSwitch: string): string {
  switch (toSwitch.toLowerCase()) {
    // 01d - clear
    case "clear sky":
      return "01d";

    // 02d - few clouds
    case "few clouds":
    case "few clouds: 11-25%":
      return "02d";

    // 03d - scattered clouds
    case "scattered clouds":
    case "scattered clouds: 25-50%":
      return "03d";

    // 04d - clouds
    case "broken clouds":
    case "broken clouds: 51-84%":
    case "overcast clouds: 85-100%":
      return "04d";

    // 09d - showers
    case "shower rain":
    case "light intensity shower rain":
    case "heavy intensity shower rain":
    case "ragged shower rain":
    case "light intensity drizzle":
    case "drizzle":
    case "heavy intensity drizzle":
    case "light intensity drizzle rain":
    case "drizzle rain":
    case "heavy intensity drizzle rain":
    case "shower rain and drizzle":
    case "heavy shower rain and drizzle":
    case "shower drizzle":
      return "09d";

    case "rain":
    case "light rain":
    case "moderate rain":
    case "heavy intensity rain":
    case "very heavy rain":
    case "extreme rain":
      return "10d";

    // 11d - thunder
    case "thunderstorm":
    case "thunderstorm with light rain":
    case "thunderstorm with rain":
    case "thunderstorm with heavy rain":
    case "light thunderstorm":
    case "heavy thunderstorm":
    case "ragged thunderstorm":
    case "thunderstorm with light drizzle":
    case "thunderstorm with drizzle":
    case "thunderstorm with heavy drizzle":
      return "11d";

    // 13d - snowy
    case "snow":
    case "light snow":
    case "heavy snow":
    case "sleet":
    case "light shower sleet":
    case "shower sleet":
    case "light rain and snow":
    case "rain and snow":
    case "light shower snow":
    case "shower snow":
    case "heavy shower snow":
    case "freezing rain":
      return "13d";

    // 50d - foggy
    case "mist":
    case "smoke":
    case "haze":
    case "sand":
    case "dust whirls":
    case "fog":
    case "dust":
    case "volcanic ash":
      return "50d";

    // defaults to just a cloud for unknown case
    default:
      return "03d";
  }
}
