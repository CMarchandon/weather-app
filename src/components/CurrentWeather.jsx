import '../index.css'

const CurrentWeather = ({data}) => {
    return (
        <div className='weather-container'>
            <div className='weather-container-top'>
                <p className='city'>{data.city}</p>
                <p className='weather'> {data.weather[0].description} </p>
                <p className='weather-min-max'> {Math.round(data.main.temp_min)}°/{Math.round(data.main.temp_max)}°</p>
                <p className='temperature'> {data.main.temp}°c</p>
            </div>
            <div className='weather-container-bottom'>
                <img alt="weather icon" className='weather-icon' src={`src/icons/${data.weather[0].icon}.png`} />
                <div className='parameter-row'>
                    <span className='parameter-label details'>Details</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Fells likes</span>
                    <span className='parameter-value'>{data.main.feels_like} °c</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Wind</span>
                    <span className='parameter-value'>{data.wind.speed} km/s</span>
                </div>
                <div className='parameter-row'>
                    <span className='parameter-label'>Humidity</span>
                    <span className='parameter-value'>{data.main.humidity} %</span>
                </div>
            </div>
        </div>
    );

}

export default CurrentWeather; 