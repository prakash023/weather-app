import './App.css';
import Navbar from './components/navbar';
import { Stations } from './data/stations';
import WeatherDashboard from './components/weather-dashboard';
import { useState, useEffect } from 'react';
import Footer from './components/footer';






let WEATHER_API_KEY= "6c6f183515cb4c34bab183719231309"
let BASE_URL = "http://api.weatherapi.com/v1"

const Berlin =     {
  "WMO-Station ID": "10384",
  "StationName": "Berlin-Tempelhof",
  "Latitude": "52.47",
  "Longitude": "13.40",
  "Height": "49",
  "Country": "Germany"
}
function App() {
  
  const [station, setStation] = useState(Berlin)
  
  function AppCallback(childprops){
    console.log("from app.js")
    console.log(childprops)
    setStation(childprops)
  }
  useEffect(() => {
    console.log("station changed")
    console.log(station)
  }, [station])
  return (
    
    station&&<div className="App" 
    style={{'margin-bottom':'50px'}}>
      
      <Navbar AppCallback={AppCallback} />
      <h2
      style={{'margin-top': '20px', 'margin-bottom': '20px'}}
      >Your weather at a glance</h2>
      <WeatherDashboard station={station}  />

      
      
    </div>
    
  );
}

export default App;
