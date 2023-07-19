import React from 'react';
import '../index.css'

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastedDays = daysOfTheWeek.slice(dayInAWeek, daysOfTheWeek.length).concat(daysOfTheWeek.slice(0, dayInAWeek));

  return (
    
    <div className="grid-container">
    {data.list.slice(0, 6).map((item, index) => (
      <div className='weather-container-little' key={index}>
        <div className="card-content">
          <p className="day-little">{forecastedDays[index]}</p>
          <p className='weather-little'>{item.weather[0].description}</p>
          <p className='temperature-little'>{item.main.temp}°c</p>
        </div>
        <div className="card-image">
          <img alt="weather icon" className='weather-icon' src={`src/icons/${item.weather[0].icon}.png`} />
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Forecast;
