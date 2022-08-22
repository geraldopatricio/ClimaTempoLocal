import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [pais, setPais] = useState("");
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [humidade, setHumidade] = useState(0);
  const [velocidade, setVelocidade] = useState(0);

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0720188f76903c6fe50931b602a81073&units=metric&lang=pt_br`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setPais(res.data.sys.country);
      setWeather(res.data.weather[0].description);
      setTempMin(res.data.main.temp_min);
      setTempMax(res.data.main.temp_max);
      setHumidade(res.data.main.humidity);
      setVelocidade(res.data.wind.speed);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div className="app">
      <div className="app__container">    
        <div>
          <div>Cidade:</div>
          <div><h1>{cityName} - {pais}</h1></div>
        </div> 
        <div>
          <div>Temp. Atual:</div>
          <div><h2>{temperature}ºC</h2></div>
        </div>
        <div>
          <div></div>
          <div><h2>{weather}</h2></div>
        </div>
        <div>
          <div>Mínima:</div>
          <div><h2>{tempMin}ºC</h2></div>
        </div>
        <div>
          <div>Máxima:</div>
          <div><h2>{tempMax}ºC</h2></div>
        </div>
        <div>
          <div>Latitude:</div>
          <div><h2>{latitude}</h2></div>
        </div>
        <div>
          <div>Longitude:</div>
          <div><h2>{longitude}</h2></div>
        </div>
        <div>
          <div>Umidade:</div>
          <div><h2>{humidade}%</h2></div>
        </div>   
        <div>
          <div>Velocidade do Vento:</div>
          <div><h2>{velocidade}</h2> Km/h</div>
        </div>       
      </div>
    </div>
  );
}

export default App;
