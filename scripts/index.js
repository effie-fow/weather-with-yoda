import axios from "./axios.js";
import { WeatherApi } from "./weather-api.js";

const API_KEY = "182df03964874f7891b92838241508";

const weatherData = new WeatherApi(API_KEY);

const getWeather = async (city) => {
  try {
    const weatherForecast = await weatherData.getWeather(city);
    console.log(weatherForecast);
  } catch (error) {
    console.error(error);
  }
};

console.log(weatherData);
getWeather("London");
