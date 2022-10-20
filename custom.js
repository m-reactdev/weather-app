// API KEY
let apiKey = "e2c1e053e1eb1eafbd26c979487fd22c";

//DEFAULT KARACHI WEATHER API
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${"Karachi"}&appid=${apiKey}&units=matric`;

// ALL LETS HERE
let input = document.getElementById("input");
let temperature = document.getElementById("tempreture");
let cityName = document.getElementById("city-name");
let condition = document.getElementById("condition");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let datePicker = document.getElementById("datePicker");
let timePicker = document.getElementById("timePicker");
let close = document.getElementById("close");
let errorText = document.getElementById("error-text");
let errorBox = document.getElementById("error-box");
let bgWeather = document.getElementById("bg-waether");
let citiesName = document.getElementById("cities");

// SET DATE
let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const setDate = () => {
  let newDate = new Date();
  let month = monthArr[newDate.getMonth()];
  let date = newDate.getDate();
  let year = newDate.getFullYear();
  datePicker.innerHTML = `${month} ${date}, ${year}`;
  setInterval(() => {
    let newDate = new Date();
    timePicker.innerHTML = newDate.toLocaleTimeString();
  }, 1000);
};

setDate();

// GET WEATHER CONDITION FROM DATA
function weatherCondition(condition) {
  if (condition.weather[0].main == "Thunderstorm") {
    bgWeather.style.backgroundImage = `url("./imgs/thunder.jpg")`;
  } else if (condition.weather[0].main == "Smoke") {
    bgWeather.style.backgroundImage = `url("./imgs/smoky.jpg")`;
  } else if (condition.weather[0].main == "Clouds") {
    bgWeather.style.backgroundImage = `url("./imgs/cloudy.jpg")`;
  } else if (condition.weather[0].main == "Clear") {
    bgWeather.style.backgroundImage = `url("./imgs/clear.jpg")`;
  } else if (condition.weather[0].main == "Rain") {
    bgWeather.style.backgroundImage = `url("./imgs/rainy.jpg")`;
  } else if (condition.weather[0].main == "Haze") {
    bgWeather.style.backgroundImage = `url("./imgs/haze.jpg")`;
  } else {
    bgWeather.style.backgroundImage = `url("./imgs/weather-bg.jpg")`;
  }
}

// ADD INFORMATION INTO HTML PAGE
function infoData(info) {
  let calTemp = info.main.temp - 273.15;
  let valTemp = Math.round(calTemp) + 1;

  temperature.innerHTML = `<h1 id="tempreture">${valTemp}<sup>o</sup><span>C</span></h1>`;
  cityName.innerHTML = `<h2 id="city-name">${info.name}, ${info.sys.country}</h2>`;
  condition.innerHTML = `<span id="temp">${info.weather[0].main}</span>`;
  wind.innerHTML = `<span id="wind">${info.wind.speed}km/h</span>`;
  humidity.innerHTML = `<span id="humidity">${info.main.humidity}%</span>`;
}

// CLOSE ICON FUNCTION
const closeIcon = () => {
  input.value = "";
  close.style.display = "none";
};

// GET DEFAULT WEATHER DATA
const karachiWeather = async () => {
  try {
    var res = await fetch(apiURL);
    var result = await res.json();

    // ADD DATA IN HTML PAGE
    infoData(result);

    // WEATHER CONDITION WITH BACKGROUND CHANGE
    weatherCondition(result);
  } catch (error) {
    console.log(error);
  }
};

karachiWeather();

// GET WEATHER DATA
const getWeather = async (city) => {
  let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=matric`;
  try {
    let response = await fetch(baseURL);
    let actualData = await response.json();

    // ADD DATA IN HTML PAGE
    infoData(actualData);

    // WEATHER CONDITION WITH BACKGROUND CHANGE
    weatherCondition(actualData);

    // CLOSE ICON DISPLAY CONDITION
    if ((input.value = actualData.name)) {
      close.style.display = "block";
    } else {
      close.style.display = "none";
    }
  } catch (actualData) {
    // ERROR HANDLING
    if (city !== actualData.name) {
      errorBox.style.bottom = "40%";
      errorText.innerHTML = "Your city name is incorrect!";
      setTimeout(() => {
        errorBox.style.bottom = "100%";
        errorText.innerHTML = "";
        input.value = "";
        close.style.display = "none";
      }, 4000);
    } else {
    }
  }
};

// MAP FUNCTION FOR ADDING CITY NAMES
var citName = ["New York", "California", "Paris", "Tokoyo"];
citiesName.innerHTML = citName
  .map((item, index) => {
    return `<li key=${index} onclick="getWeather(this.innerHTML)">${item}</li>`;
  })
  .join("");


