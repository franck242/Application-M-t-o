const container = document.querySelector('.container');
const search = document.querySelector('.search-btn');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const cityInput = document.querySelector('.search-box input');
const image = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

const apiKey = '97932e1a60dd007f15162964fed8d8a7';

search.addEventListener('click', () => {
    const city = cityInput.value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=fr`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                alert('Ville non trouvée');
                return;
            }

            // Mise à jour des icônes selon les conditions météo
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/sun.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/clouds.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/fog-day.png';
                    break;
                default:
                    image.src = 'images/clouds.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        });
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search.click();
    }
});
