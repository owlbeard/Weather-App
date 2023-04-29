import './assets/styles/style.css';
import './assets/styles/normalize-css.css';

const body = document.querySelector('body');
const form = document.querySelector('form');
const data = document.querySelector('.data');
const city = document.querySelector('#city');
const condition = document.querySelector('#condition');
const feels = document.querySelector('#feels');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');

let hidden = true;

async function getWeather(c) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7d64c2ec5b734e8a82462725232204&q=${c}`, { mode: 'cors' });
    const weatherData = await response.json();
    if (hidden === true) {
      data.classList.remove('hidden');
      data.classList.add('shown');
      hidden = false;
    }
    const conduit = weatherData.current.condition.text;
    console.log(weatherData.current.condition.text);
    city.textContent = weatherData.location.name;
    condition.textContent = `${weatherData.current.temp_c}° ${conduit}`;
    feels.textContent = `Feels: ${weatherData.current.feelslike_c}°`;
    humidity.textContent = `Humidity: ${weatherData.current.humidity}`;
    wind.textContent = `Wind: ${weatherData.current.wind_kph} km/h`;
    if (conduit.includes('loud') || conduit.includes('cast')) {
      body.className = 'cloudy';
    } else if (conduit.includes('ain') && !conduit.includes("hunder") || conduit.includes('izzle')) {
      body.className = 'rainy';
    } else if (conduit.includes('unny') || conduit.includes('lear')) {
      body.className = 'sunny';
    } else if (conduit.includes('now')) {
      body.className = 'snowy';
    } else if (conduit.includes('ist')) {
      body.className = 'misty';
    } else if (conduit.includes("hunder")) {
      body.className = 'thunder';
    } else {
      body.className = 'default';
    }
  } catch (err) { alert(err); }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chosen = document.querySelector('#search').value;
  if (hidden === false) {
    data.classList.remove('shown');
    data.classList.add('hidden');
    hidden = true;
  }
  getWeather(chosen);
  form.reset();
});
