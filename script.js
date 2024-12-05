async function loadCountriesAndCities() {
    const response = await fetch('cou.json');
    const data = await response.json();
    
    let text2 = document.querySelector('.text2');
    let weatherInfo = document.querySelector('#weather-info');
    let img = document.querySelector('.img');
   


    const weatherConditions = {
    "clear sky": "https://www.shutterstock.com/shutterstock/videos/8575810/thumb/11.jpg?ip=x480",
    "few clouds": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBneUySU9Ws_2yg8-TfdG0okKevNWlQdsCIn-QQymSzpABp6rJpOzEOoDQZ4TQMic59qg&usqp=CAU", // Replace with actual image URL
    "scattered clouds": "https://live.staticflickr.com/2106/1909487867_de140c7eb8_b.jpg", // Replace with actual image URL
    "broken clouds": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLEnxTBKjtQHEXSffzwdTsAE-UwBClw6K-Q&s", // Replace with actual image URL
    "light rain": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR22Fgu56qQ6hi_OPvGWNK6j2W80mR4FocZOIDjf18eJCLvMSlHODIl2DXtmxDykF09hU8&usqp=CAU", // Replace with actual image URL
    "moderate rain": "https://www.sciline.org/climate/climate-change/torrential-rain/", // Replace with actual image URL
    "heavy rain": "https://i.ytimg.com/vi/r2sFmr7OgDs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCH_8PRJYDrrkE7AF5CcR9xcFQeMw", // Replace with actual image URL
    "thunderstorm": "https://images.newscientist.com/wp-content/uploads/2024/02/06103007/SEI_189745988.jpg", // Replace with actual image URL
    "snow": "https://thumbs.dreamstime.com/b/heavy-snowfall-8235324.jpg", // Replace with actual image URL
    "mist": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDY2xKrn_lNdmkkeRPxdtx1gZ6nmaGx6R-pw&s", // Replace with actual image URL
    "overcast clouds": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfAh0pXEejJTTB6C2Fg7qHk60reERNoPsJ6AJnOUF6qrlADHAW5Dd68Q3ja-HhtOPhcvc&usqp=CAU",
    "other":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyk_ZPNiSaxUcqTN-f8u4UEa2IDmqVWCsafWxSRzwBMvsmjSSRL4J34mftEGuVNuO1784&usqp=CAU"
};

 

    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');
    
    // Clear previous options in both dropdowns
    countrySelect.innerHTML = '<option value="">-- Choose Country --</option>';
    citySelect.innerHTML = '<option value="">-- Choose City --</option>';

    // Populate country dropdown
    data.countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.country;
        option.textContent = country.country;
        countrySelect.appendChild(option);
    });

    // Event listener to populate cities when a country is selected
    countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;
        const selectedCountryData = data.countries.find(c => c.country === selectedCountry);
        
        // Clear previous city options
        citySelect.innerHTML = '<option value="">-- Choose City --</option>';

        if (selectedCountryData) {
            selectedCountryData.cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Event listener to fetch weather data when a city is selected
    citySelect.addEventListener('change', async (e) => {
        const selectedCity = e.target.value;
        const apiKey = 'dfa8cc6f32fe66fcc40887d4a1624214'; // Replace with your weather API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`; // OpenWeatherMap API URL

        try {
            const response = await fetch(apiUrl);
            const weatherData = await response.json();

            if (weatherData.cod === 200) {
                text2.innerText = `Weather in ${selectedCity}`;
                
                weatherInfo.innerHTML = `
                    <strong>Weather in ${selectedCity}</strong><br>
                    Temperature: ${weatherData.main.temp}°C<br>
                    Weather: ${weatherData.weather[0].description}<br>
                    Humidity: ${weatherData.main.humidity}%<br>
                    Wind Speed: ${weatherData.wind.speed} m/s
                `;
                img.src = weatherConditions[weatherData.weather[0].description] || weatherConditions["other"];

                // console.log(weatherConditions[weatherData.weather[0].description])
            } else {
                // If there's an error fetching weather data
                weatherInfo.innerHTML = `Sorry, we couldn't fetch the weather data for ${selectedCity}. Please try again.`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        }
    });
}

loadCountriesAndCities();
