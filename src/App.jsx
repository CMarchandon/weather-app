import Search from './components/Search' // Import the Search component
import CurrentWeather from './components/CurrentWeather'; // Import the CurrentWeather component
import './index.css' // Import the CSS styles
import { weatherApiUrl } from './api';
import { weatherApiKey } from './api';
import { useState } from 'react';
import Forecast from './components/Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  // Function to handle search input changes
  const handleOnSearchChange = (searchData) => {
    const[lat, lon]= searchData.value.split(" ");

    const currentWeatherFetch = fetch (`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`);
    const forecastWeatherFetch = fetch (`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`);
    
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async(response) =>{
        const weatherResponse =  await response [0].json();
        const forecastResponse =  await response [1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse});
        setForecastWeather({ city: searchData.label, ...forecastResponse});
      })
      .catch((error)=> console.log(error));
  }

  console.log(currentWeather);
  console.log(forecastWeather);

  return (
    <div className='global-container'>
      <Search onSearchChange={handleOnSearchChange}/> {/* Render the Search component */}
      {currentWeather && <CurrentWeather data={currentWeather}/>} {/* Render the CurrentWeather component */}
      {forecastWeather && <Forecast data={forecastWeather}/>}
    </div>
  )
}

export default App // Export the App component as the default export