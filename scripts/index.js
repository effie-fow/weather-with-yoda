import axios from "./axios.js";
import { WeatherApi } from "./weather-api.js";
import { RandomQuote } from "./random-quotes-api.js";
import { appendNewElement } from "./utils.js";
// import { YodaTranslator } from "./yoda-translator-api.js";

const API_KEY = "182df03964874f7891b92838241508";

const weatherForecastEl = document.querySelector(".weather-forecast");
const backgroundEl = document.querySelector(".weather-forecast__background");
const forecastContainerEl = document.querySelector(
  ".weather-forecast__forecast-container"
);
const buttonDayOne = document.querySelector(".weather-forecast__button--day-1");
const buttonDayTwo = document.querySelector(".weather-forecast__button--day-2");
const buttonDayThree = document.querySelector(
  ".weather-forecast__button--day-3"
);
const yodaEl = document.querySelector(".weather-forecast__yoda-img");
const yodaQuoteContainer = document.querySelector(".yoda-quote");

const weatherData = new WeatherApi(API_KEY);
const quoteData = new RandomQuote();
// const yodaTranslationData = new YodaTranslator();

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

  if (todayChanceOfRain > 70) {
    backgroundEl.classList.remove(
      "weather-forecast__background--sunny",
      "weather-forecast__background--cloudy"
    );
    backgroundEl.classList.add("weather-forecast__background--rainy");
    yodaEl.setAttribute("src", "./assets/images/yoda.png");
  } else if (todayCondition.toLowerCase() === "sunny") {
    backgroundEl.classList.remove(
      "weather-forecast__background--cloudy",
      "weather-forecast__background--rainy"
    );
    backgroundEl.classList.add("weather-forecast__background--sunny");
    yodaEl.setAttribute("src", "./assets/images/yoda-sunny.png");
  } else if (
    todayCondition.toLowerCase() === "partly cloudy" ||
    todayCondition.toLowerCase() === "cloudy" ||
    todayCondition.toLowerCase() === "overcast"
  ) {
    backgroundEl.classList.remove(
      "weather-forecast__background--sunny",
      "weather-forecast__background--rainy"
    );
    backgroundEl.classList.add("weather-forecast__background--cloudy");
    yodaEl.setAttribute("src", "./assets/images/yoda.png");
  }
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

// const getTranslation = async (quote) => {
//   try {
//     const translation = await yodaTranslationData.translateQuote(quote);
//     return translation;
//   } catch (error) {
//     console.error(error);
//   }
// };

const getQuote = async () => {
  try {
    yodaQuoteContainer.innerHTML = "";

    const quote = await quoteData.getQuote();

    const quoteEl = appendNewElement(
      yodaQuoteContainer,
      "p",
      "yoda-quote__quote"
    );

    // const quoteToJSON = JSON.stringify(quote);
    // const yodaQuote = await getTranslation(quoteToJSON);

    quoteEl.innerText = `"${quote}"`;
  } catch (error) {
    console.error(error);
  }
};

buttonDayOne.addEventListener("click", async () => {
  await getWeather("London", 0);
  getQuote();
});

buttonDayTwo.addEventListener("click", async () => {
  await getWeather("London", 1);
  getQuote();
});

buttonDayThree.addEventListener("click", async () => {
  await getWeather("London", 2);
  getQuote();
});
