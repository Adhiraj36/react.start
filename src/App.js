import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(()=>{
    g = async() => {
      const resp = await axios.get(API_URL)
      if (resp.status === 200) {
        setData(resp.data);
      } else {
        setError("API call failed");
      }
    }
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
    <a className="navbar-brand" href="/">Text Changer</a>
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

<p>
  Elevation: {data?.elevation}
</p>
    </>
  );
}

export default App;
