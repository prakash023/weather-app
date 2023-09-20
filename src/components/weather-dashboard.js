import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import FetchWeatherData from "../utils/fetchData";
import GetLocation from "../utils/getLocation";
import getDateTimeString from "../utils/getTimeString";
import SplitDateTimeString from "../utils/splitDateTimeString";
import GetDayofWeek from "../utils/getDayofWeek";
import Chart from "./chart";




let date = new Date()
let API_KEY = "53cd589d4749d29838fffebb3ae12968"

let city= "Berlin"
let BASE_URL = "https://api.brightsky.dev/"
//let reqUrl = "http://api.weatherapi.com/v1/current.json?key="+WEATHER_API_KEY+"&q="+city
//const weatherData = FetchWeatherData("http://api.weatherapi.com/v1/current.json?key=6c6f183515cb4c34bab183719231309&q=Berlin")
export default function WeatherDashboard(props) {

  const [weatherData, setWeatherData] = useState()
  const [forecast, setForecast] = useState()
  const [station, setStation] = useState(props.station?props.station:city)
  console.log("station on weather dashboard")
  let cityName = props.station.name?props.station.name:city
  let geo_url = "https://geocoding-api.open-meteo.com/v1/search?name=" +cityName + "&count=5&language=en&format=json"
  const url = "http://api.weatherstack.com/current?access_key=53cd589d4749d29838fffebb3ae12968&query="+cityName
  //const url = BASE_URL + '/current_weather?wmo_station_id='+props.station["WMO-Station ID"]
  const forecast_url =  "http://api.weatherstack.com/forecast?access_key=53cd589d4749d29838fffebb3ae12968&query="+cityName+"&forecast_days=5&,apparent_temperature,precipitation,visibility,uv_index"

  useEffect(() => {

    FetchWeatherData(geo_url).then(
      data => {
        console.log("refetching")
        console.log(geo_url)
        console.log(data)
        setStation(data[0])
        let info = (data.results[0])
        let long = info.longitude
        let lat = info.latitude
        let tz = info.timezone
        FetchWeatherData("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude="+ long +"&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&current_weather=true&timezone="+tz)
        .then(data => {
          console.log("---------------------")
          console.log(data)
          console.log("---------------------")
          setWeatherData(data)
        })
      }
    )
  }, [props.station])

  
  return (
    
      weatherData && 
      <>
      <section className="vh-100" style={{ backgroundColor: "#ffffff" }}>
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="10">
            <MDBCard
              className="shadow-0 border border-dark border-5 text-dark"
              style={{ borderRadius: "10px" }}
            >
              <MDBCardBody className="p-4">
                <div className="row text-center">
                  <div
                    className="col-md-9 text-center border-end border-5 border-dark py-4"
                    style={{marginTop: '-1.5rem', marginBottom: '-1.5rem'}}
                  >
                    <div className="d-flex justify-content-around mt-3">
                      <h3 className="h3 mb-3">{cityName}</h3>
                      <p className="h3 mb-3">{SplitDateTimeString(weatherData.current_weather.time).date}</p>
                      <p className="h3 mb-3">{GetDayofWeek()}</p>
                    </div>
                    <div className="d-flex justify-content-around align-items-center py-5 my-4">
                      <p className="fw-bold mb-0" style={{fontSize: '7rem'}}>
                      {weatherData.current_weather.temperature}°C
                      </p>
                      <div className="text-start">
                       {/* <p className="h3 mb-3">Feels Like: {weatherData.current.feelslike}°C</p>
                        
                        <p className="h3 mb-3">{weatherData.current.weather_descriptions[0]}</p>*/}
                      </div>
                    </div>
                    <div className="d-flex justify-content-around align-items-center mb-3">
                      {
                        weatherData.daily.time.slice(1).map((el,i) => {
                          return <div
                          className="flex-column border"
                          style={{borderRadius: '10px', padding: '.75rem'}}
                        >
                          <p className="small mb-1">{el}</p>
                          <p className="small mb-0">
                            <strong>{(weatherData.daily.temperature_2m_max[i] + weatherData.daily.temperature_2m_max[i])/2}</strong>
                          </p>
                        </div>
                        })
                      }

                    </div>
                  </div>
                  {<div className="col-md-3 text-end">
                  <p className="h3 mb-5 pb-5">Info</p>

                      <p className="pb-1">
                        <span className="pe-2">Sunrise: </span> <strong>{SplitDateTimeString(weatherData.daily.sunrise[0]).hours}:{SplitDateTimeString(weatherData.daily.sunrise[0]).minutes}</strong>

                      </p>
                      <p className="pb-1">

                        <span className="pe-2">Sunset: </span> <strong>{SplitDateTimeString(weatherData.daily.sunset[0]).hours}:{SplitDateTimeString(weatherData.daily.sunset[0]).minutes}</strong>
                      </p>
                      <p className="pb-1">

                        <span className="pe-2">Precipitation: </span> <strong>{weatherData.daily.precipitation_sum[0]}</strong>
                        </p>

                        <p className="pb-1">

                          <span className="pe-2">UV Index: </span> <strong>{weatherData.daily.uv_index_max[0]}</strong>
                          </p>

{/*                           <p className="pb-1">

                          <span className="pe-2">Pressure: </span> <strong>{}</strong>
                          </p> */}
                          <p className="pb-1">

                          <span className="pe-2">Wind: </span> <strong>{weatherData.current_weather.windspeed}Km/h {}</strong>
                          </p>

                  </div>}
                </div>
              </MDBCardBody>

            </MDBCard>
            <h2
            style={{'margin-top': '20px', 'margin-bottom': '20px'}}
            >Forecast of the week</h2>
            <div style={{"border":"5px black solid", "border-radius":"10px"}}>
              <Chart data={weatherData}/>
            </div>
          </MDBCol>

        </MDBRow>

      </MDBContainer>

    </section>
   

    
    </> 
  );
                  
}