import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { weatherApiUrl, weatherApiKey, unsplashApiKey } from './api';
import './index.css';

function App() {
  // State variables to store the current weather, forecast weather, and photo URL
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    // Fetch a random photo from Unsplash API based on current weather's location
    if (currentWeather && currentWeather.name) {
      const location = currentWeather.name;
      const photoResponse = fetch(
        `https://api.unsplash.com/photos/random?query=${location}&client_id=${unsplashApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPhotoUrl(data.urls.regular); // Update the photo URL state
        })
        .catch((error) => console.log(error));
    }
  }, [currentWeather]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    // Perform API requests for current weather and forecast using provided coordinates
    Promise.all([
      fetch(
        `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      ).then((response) => response.json()),
      fetch(
        `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
      ).then((response) => response.json()),
    ])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather({ city: searchData.label, ...weatherResponse }); // Update current weather state
        setForecastWeather({ city: searchData.label, ...forecastResponse }); // Update forecast weather state
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="global-container" style={{ backgroundImage: `url(${photoUrl})` }}>

      <h1>Weather Corp <span className='corp'>©</span> </h1>

      {/* Render the Search component and pass the handleOnSearchChange callback */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Render the CurrentWeather component if currentWeather data is available */}
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {/* Render the Forecast component if forecastWeather data is available */}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}

export default App;
