async function fetchLocation(latitude, longitude) {
    let errorMessage = document.getElementById('errorMessage');
    let loadingMessage = document.getElementById('loadingMessage'); 
    loadingMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=45c1808605aaea18532f249cb6e909ab&units=metric`);
        let data = await response.json();
        if (data.cod === 200) {
            let queryString = new URLSearchParams({
                city: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity
            }).toString();
            window.location.href = `weather.html?${queryString}`;
        } else {
            console.error('Error:', data.message);
            document.getElementById('incorrectMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    } finally {
        loadingMessage.style.display = 'none';
    }
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchLocation(latitude, longitude);
        }, error => {
            console.error('Error getting location:', error);
            document.getElementById('errorMessage').style.display = 'block';
        });
    } else {
        console.error('Geolocation is not available');
        document.getElementById('errorMessage').style.display = 'block';
    }
}

document.getElementById('locationButton').addEventListener('click', getLocationWeather);

async function fetchWeather() {
    let city = document.getElementById('cityInput').value;
    let incorrectMessage = document.getElementById('incorrectMessage');
    let errorMessage = document.getElementById('errorMessage');
    let loadingMessage = document.getElementById('loadingMessage');
    if (city) {
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        incorrectMessage.style.display = 'none';
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=45c1808605aaea18532f249cb6e909ab&units=metric`);
            let data = await response.json();
            if (data.cod === 200) {
                let queryString = new URLSearchParams({
                    city: data.name,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    feels_like: data.main.feels_like,
                    humidity: data.main.humidity
                }).toString();
                window.location.href = `weather.html?${queryString}`;
            } else {
                console.error('Error:', data.message);
                incorrectMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.style.display = 'block';
        } finally {
            loadingMessage.style.display = 'none';
        }
    } else {
        incorrectMessage.style.display = 'block';
    }
}

function weatherInfo() {
    let params = new URLSearchParams(window.location.search);
    document.getElementById('locationName').innerText = params.get('city');
    document.getElementById('temperature').innerText = params.get('temperature') + '°C';
    document.getElementById('weatherDescription').innerText = params.get('description');
    document.getElementById('feelsLike').innerText = params.get('feels_like') + '°C';
    document.getElementById('humidity').innerText = params.get('humidity') + '%';
}

document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function goHome() {
    window.location.href = 'index.html';
}
