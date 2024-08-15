import axios from "./axios.js";
import { WeatherApi } from "./weather-api.js";
import { appendNewElement } from "./utils.js";

const API_KEY = "182df03964874f7891b92838241508";

const weatherForecastEl = document.querySelector(".weather-forecast");
const forecastContainerEl = document.querySelector(
  ".weather-forecast__forecast-container"
);
const buttonDayOne = document.querySelector(".weather-forecast__button--day-1");
const buttonDayTwo = document.querySelector(".weather-forecast__button--day-2");
const buttonDayThree = document.querySelector(
  ".weather-forecast__button--day-3"
);

const weatherData = new WeatherApi(API_KEY);

const getDayWeather = (threeDayForecast, dayIndex) => {
  const todayTemperature = threeDayForecast[dayIndex].day.avgtemp_c;
  const todayCondition = threeDayForecast[dayIndex].day.condition.text;
  const todayChanceOfRain = threeDayForecast[dayIndex].day.daily_chance_of_rain;

  const temperatureEl = appendNewElement(
    forecastContainerEl,
    "h2",
    "weather-forecast__temperature"
  );
  const conditionEl = appendNewElement(
    forecastContainerEl,
    "h3",
    "weather-forecast__condition"
  );
  const precipitationEl = appendNewElement(
    forecastContainerEl,
    "h3",
    "weather-forecast__precipitation"
  );

  temperatureEl.innerText = `${todayTemperature}°C`;
  conditionEl.innerText = `${todayCondition}`;
  precipitationEl.innerText = `Chance of rain: ${todayChanceOfRain}%`;
};

const getWeather = async (city, dayIndex) => {
  try {
    const threeDayForecast = await weatherData.getWeather(city);
    forecastContainerEl.innerHTML = "";
    getDayWeather(threeDayForecast, dayIndex);
  } catch (error) {
    console.error(error);
  }
};

buttonDayOne.addEventListener("click", async () => {
  await getWeather("London", 0);
});

buttonDayTwo.addEventListener("click", async () => {
  await getWeather("London", 1);
});

buttonDayThree.addEventListener("click", async () => {
  await getWeather("London", 2);
});
