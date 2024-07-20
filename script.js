document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6878cd3100340f7ce9be193e607be769';
    const searchButton = document.getElementById('search-button');
    const locationInput = document.getElementById('location-input');

    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        fetchWeatherData(location);
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        }, () => {
            fetchWeatherData('London');
        });
    } else {
        fetchWeatherData('London');
    }

    function fetchWeatherData(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeatherInfo(data);
                updateBackground(data.weather[0].main);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchWeatherDataByCoords(lat, lon) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeatherInfo(data);
                updateBackground(data.weather[0].main);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function updateWeatherInfo(data) {
        document.querySelector('.location').textContent = data.name;
        document.querySelector('.temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.weather-description').textContent = data.weather[0].description;
        document.querySelector('.humidity').textContent = `${data.main.humidity}% Humidity`;
        document.querySelector('.wind-speed').textContent = `${data.wind.speed} km/h Wind Speed`;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    function updateBackground(condition) {
        let gradient;
        switch(condition.toLowerCase()) {
            case 'clear':
                gradient = 'linear-gradient(to right, #ff7e5f, #feb47b)';
                break;
            case 'clouds':
                gradient = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
                break;
            case 'rain':
                gradient = 'linear-gradient(to right, #00c6ff, #0072ff)';
                break;
            case 'snow':
                gradient = 'linear-gradient(to right, #e6dada, #274046)';
                break;
            case 'thunderstorm':
                gradient = 'linear-gradient(to right, #2c3e50, #4ca1af)';
                break;
            default:
                gradient = 'linear-gradient(to right, #3f5efb, #fc466b)';
                break;
        }
        document.body.style.background = gradient;
    }
});