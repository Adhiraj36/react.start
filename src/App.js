import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(()=>{
    const g = async() => {
      const resp = await axios.get(API_URL)
      console.log(resp);
      if (resp.status === 200) {
        setData(resp.data);
      } else {
        setError("API call failed");
      }
    }
    g();
  },[]) // Inputs anoynomous function and a array of states, triggers on every state change

  if (error !== "") {
    return (
      <p>{error}</p>
    )
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Weather Charts</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">About</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>


    <div className="charts-container">
      <div className="charts-grid">
        {data && (() => {
          const times = data.hourly.time.map((t) => new Date(t));
          const temps = data.hourly.temperature_2m;
          const series = [
            {
              id: 'temperature_2m',
              data: temps,
            },
          ];

          return (
            <div className="chart-card">
              <div className="chart-title">Temperature (2m)</div>
              <div className="chart-body">
                <LineChart
                  series={series}
                  xAxis={[{ scaleType: 'time', data: times }]}
                  height={280}
                />
              </div>
            </div>
          );
        })()}

        {data && (() => {
          const times = data.hourly.time.map((t) => new Date(t));
          const hum = data.hourly.relative_humidity_2m;
          const series = [
            {
              id: 'relative_humidity_2m',
              data: hum,
            },
          ];

          return (
            <div className="chart-card">
              <div className="chart-title">Relative Humidity (%)</div>
              <div className="chart-body">
                <LineChart
                  series={series}
                  xAxis={[{ scaleType: 'time', data: times }]}
                  height={280}
                />
              </div>
            </div>
          );
        })()}

        {data && (() => {
          const times = data.hourly.time.map((t) => new Date(t));
          const wind_speed = data.hourly.wind_speed_10m;
          const series = [
            {
              id: 'wind_speed_10m',
              data: wind_speed,
            },
          ];

          return (
            <div className="chart-card">
              <div className="chart-title">Wind Speed (10m)</div>
              <div className="chart-body">
                <LineChart
                  series={series}
                  xAxis={[{ scaleType: 'time', data: times }]}
                  height={280}
                />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
    </>
  );
}

export default App;
