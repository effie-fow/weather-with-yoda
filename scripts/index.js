import axios from "./axios.js";
import { WeatherApi } from "./weather-api.js";

const API_KEY = "182df03964874f7891b92838241508";

const weatherData = new WeatherApi(API_KEY);

const getDayWeather = (threeDayForecast, dayIndex) => {
  const todayTemperature = threeDayForecast[dayIndex].day.avgtemp_c;
  const todayCondition = threeDayForecast[dayIndex].day.condition.text;
  const todayChanceOfRain = threeDayForecast[dayIndex].day.daily_chance_of_rain;

  const weatherObject = {
    temperature: todayTemperature,
    condition: todayCondition,
    chanceOfRain: todayChanceOfRain,
  };
  console.log(weatherObject);
};

const getWeather = async (city, dayIndex) => {
  try {
    const threeDayForecast = await weatherData.getWeather(city);
    getDayWeather(threeDayForecast, dayIndex);
  } catch (error) {
    console.error(error);
  }
};

getWeather("London", 2);
