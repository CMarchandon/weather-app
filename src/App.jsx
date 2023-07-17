
import Search from './components/Search'
import CurrentWeather from './components/CurrentWeather';
import './index.css'

function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange}/>
      <CurrentWeather/>
    </div>
  )
}

export default App
