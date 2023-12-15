const apiKey = '7ded80d91f2b280ec979100cc8bbba94';

/*
function getWeather() {
    const address = document.getElementById('addressInput').value;

    //https://openweathermap.org/current
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentWeatherUrl, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const currentWeatherData = JSON.parse(xhr.responseText);
            displayCurrentWeather(currentWeatherData);
        } else {
            console.error('Error fetching current weather data');
        }
    };

    xhr.send();
    
    //https://openweathermap.org/forecast5 
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => displayForecast(forecastData))
        .catch(error => console.error('Error fetching forecast data'));
}
*/

function getWeather() {
    const address = document.getElementById('addressInput').value;

    //https://openweathermap.org/current
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(currentWeatherData => {
			console.log('Current Weather Data:', currentWeatherData);
            displayCurrentWeather(currentWeatherData);

            //https://openweathermap.org/forecast5 
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${apiKey}`;
            return fetch(forecastUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(forecastData => {
			console.log('Forecast 5 Weather Data:', forecastData);
            displayForecast(forecastData);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    const temperatureCelsius = kelvinToCelsius(data.main.temp);

    currentWeatherDiv.innerHTML = `<h2>Current Weather</h2>
                                   <p>Temperature: ${Math.round(temperatureCelsius)} &#8451;</p>
                                   <p>Humidity: ${data.main.humidity}%</p>
                                   <p>Description: ${data.weather[0].description}</p>`;
}

//const description;
//date.toDateString()

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const temperature = kelvinToCelsius(forecast.main.temp);
        const description = forecast.weather[0].description;

        forecastDiv.innerHTML += `<p>Date: ${date.toDateString()}</p> 
                                  <p>Temperature: ${Math.round(temperature)} &#8451;</p>
								  <p>Humidity: ${forecast.main.humidity}%</p>
                                  <p>Description: ${description}</p>
                                  <hr>`;
    }
}

document.getElementById('addressInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

/*zmiana tla od pogody
document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var weatherElement = document.querySelector('.background_img');
    weatherElement.className = 'background_img';

    switch (description.toLowerCase()) {
        case 'sunny_default':
            body.classList.add('sunny_default');
            break;
        case 'cloudy':
            body.classList.add('cloudy');
            break;
        case 'snowy':
            body.classList.add('snowy');
            break;
        default:
             body.classList.add('sunny_default');
    }
});*/