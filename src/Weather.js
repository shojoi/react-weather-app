import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    console.log(response);
    setLoaded(true);

    setWeather({
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "606a063f1d6fa729e32e75a0af2c3ff9";
    let unit = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(displayWeather);
  }

  function handleSubmitInput(event) {
    //console.log(`ncvjhd ${event.target.value}`);
    setCity(event.target.value);
  }

  // NOTE : IMPORTANT SYNTAX : start - creating a JSX element for reusing n how to use in conditional rendering

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city"
        onChange={handleSubmitInput}
      />
      <button type="Submit">Search</button>
    </form>
  );

  // end

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C </li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
        </ul>
      </div>
    );
  } else {
    return form; // NOTE: the syntax
  }
}
