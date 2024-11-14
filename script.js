const apiKey = "af70ce3754a9210636f940fd5b8efa93";

// Fetch weather by city name
function fetchWeatherByLocation() {
    const location = document.getElementById("locationInput").value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a city name.");
    }
}

// Fetch weather using geolocation
function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(null, latitude, longitude);
            },
            () => alert("Could not access location.")
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch weather from the OpenWeatherMap API
function fetchWeatherData(city = null, lat = null, lon = null) {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (city) {
        url += `&q=${city}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => alert("Failed to retrieve data. Please try again."));
}

// Display weather data
function displayWeatherData(data) {
    if (data.cod === 200) {
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById("weatherInfo").innerHTML = weatherHTML;
    } else {
        alert("Location not found.");
    }
}

// Automatically fetch weather data based on geolocation on page load
window.onload = fetchWeatherByGeolocation;
