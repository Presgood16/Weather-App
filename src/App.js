import React from 'react';
import './App.css';
import PIC1 from './Images/clear.jpg';
import PIC2 from './Images/cloudy_sky.jpg';
import PIC3 from './Images/rain.jpg';
import PIC4 from './Images/mistPicture.jpg';
import PIC5 from './Images/stormy_sky.jpg';
import PIC6 from './Images/snowy_mountain.jpg';


function App() {

  let appId = '71f6779186cc32448b4c412eea65b982';
  let units = 'metric'; 
  let searchMethod; 

  function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
    }

  function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = `url(${ PIC1 })`;
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = `url(${ PIC2 })`;
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = `url(${ PIC3 })`;
            break;

        case 'Mist':
            document.body.style.backgroundImage = `url(${ PIC4 })`;
            break;    
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = `url(${ PIC5 })`;
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = `url(${ PIC6 })`;
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';

    setPositionForWeatherInfo();
  }

  function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
  }

  window.addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
  });

  function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
  }
  
        
      return (
        <div className="App">
                  <h1 id="intro">Weather App</h1>
        <div id="weatherContainer">
            <div id="weatherDescription">
                <h1 id="cityHeader"> </h1>
                <div id="weatherMain">
                    <div id="temperature"></div>
                    <div id="weatherDescriptionHeader"></div>
                    <div><img id="documentIconImg" alt=''/></div>
                </div>
                
                <div id="windSpeed" className="bottom-details"></div>
                <div id="humidity" className="bottom-details"></div>
                
            </div>

        </div>
        <div id="searchContainer">
            <input className="searchControl" type="text" placeholder="Please Enter City Name" id="searchInput" />
            <button className="searchControl1" id="searchBtn">Go!</button>
        </div>

        <footer>
          Developed by Taiwo
        </footer>
    </div>
  );
}

export default App;
