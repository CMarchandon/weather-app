import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { weatherApiUrl, weatherApiKey, unsplashApiKey } from './api';
import './index.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (currentWeather && currentWeather.name) {
      const location = currentWeather.name;
      const photoResponse = fetch(
        `https://api.unsplash.com/photos/random?query=${location}&client_id=${unsplashApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPhotoUrl(data.urls.regular);
        })
        .catch((error) => console.log(error));
    }
  }, [currentWeather]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    Promise.all([
      fetch(
        `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      ).then((response) => response.json()),
      fetch(
        `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      ).then((response) => response.json()),
    ])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="global-container" style={{ backgroundImage: `url(${photoUrl})`}}>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
