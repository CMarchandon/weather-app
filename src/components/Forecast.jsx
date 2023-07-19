import React from 'react';
import '../index.css'

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastedDays = daysOfTheWeek.slice(dayInAWeek, daysOfTheWeek.length).concat(daysOfTheWeek.slice(0, dayInAWeek));

  return (
    // Render the forecast weather data
    <div className="grid-container">
      {/* Map over the first 6 items in the data.list array */}
      {data.list.slice(0, 6).map((item, index) => (
        <div className='weather-container-little' key={index}>
          <div className="card-content">
            {/* Display the forecasted day */}
            <p className="day-little">{forecastedDays[index]}</p>
            {/* Display the weather description */}
            <p className='weather-little'>{item.weather[0].description}</p>
            {/* Display the temperature */}
            <p className='temperature-little'>{item.main.temp}°c</p>
          </div>
          <div className="card-image">
            {/* Display the weather icon */}
            <img alt="weather icon" className='weather-icon' src={`src/icons/${item.weather[0].icon}.png`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
