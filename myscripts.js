async function fetchWeather() {
    let city = document.getElementById('cityInput').value;
    if (city) {
        let loadingMessage = document.getElementById('loadingMessage');
        loadingMessage.style.display = 'block';
        
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
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loadingMessage.style.display = 'none';
        }
    } else {
        alert('Enter a city name!');
    }
}
