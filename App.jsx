import {useState} from "react";
import clearIcon from "./assets/clear.png";
import cloudyIcon from "./assets/cloudy.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainyIcon from "./assets/rainy.webp";
import searchIcon from "./assets/search.png";
import snowIcon from "./assets/snow.png";
import windyIcon from "./assets/windy.png";
import './App.css';

const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(<>
    <div className="image">
      <img src={icon} alt="Image"/> 
    </div>
    <div className="temp">{temp} °C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">Latitude</span>
        <span >{lat}</span>
      </div>
      <div>
        <span className="log">Longitude</span>
        <span >{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className="icon"/>
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>

      <div className="element">
        <img src={windyIcon} alt="wind" className="icon"/>
        <div className="data">
          <div className="wind-percent">{wind} Km/Hr</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </>)
}



function App() {

  let api_key="ee24c5e29dc1f120183261908f52249a";
  const [text,setText]=useState("")
 const [icon,setIcon]=useState(clearIcon);
 const [temp,setTemp]=useState(0);
 const[city,setCity]=useState("Name of city");
 const[country,setCountry]=useState("Name of Country");
 const[lat,setLat]=useState(0);
 const[log,setLog]=useState(0);
 const[humidity,setHumidity]=useState(0);
 const[wind,setWind]=useState(0);
const[cityNotFound,setCityNotFound]=useState(false);

const weatherIconMap={
  "01d":clearIcon,
  "01n":clearIcon,
  "02d":cloudyIcon,
  "02n":cloudyIcon,
  "03d":drizzleIcon,
  "03n":drizzleIcon,
  "04d":drizzleIcon,
  "04n":drizzleIcon,
  "09d":rainyIcon,
  "09n":rainyIcon,
  "10d":rainyIcon,
  "10n":rainyIcon,
  "13d":snowIcon,
  "13n":snowIcon,
};

 const search=async()=>{
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

  try{
    let response= await fetch(url);
    let data= await response.json();
    if(data.cod==="404"){
      console.error("City not Found");
      setCityNotFound(true);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    const weatherIconCode=data.weather[0].icon; ///The weather is present as a array of objects, the icon code is present in the first obj of the array.
    setIcon(weatherIconMap[weatherIconCode] || clearIcon);

}catch(error){
    console.error("An error occured",error.message);
  }

 };
     

const handleCity = (e)=>{
  setText(e.target.value)
}

const handleKeyDown=(e)=>{
  if(e.key=="Enter"){
  search();
  }
}
  return (
    <>
     <div className="container">
      <div className="input-container">
        <input type="text" 
        className="cityInput" 
        placeholder="Search City" 
        onChange={handleCity}
        value={text}
        onKeyDown={handleKeyDown}/>
        <div className="search-icon" onClick={()=>search()}>
          <img src={searchIcon} alt="Search" className="search"/>
        </div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
      humidity={humidity} wind={wind}/>

      <p className="copyright">
        Designed by <span>Dhavanesh</span>
      </p>
     </div>
    </>
  )
}

export default App
