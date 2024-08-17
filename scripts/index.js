import { WeatherApi } from "./weather-api.js";
import { RandomQuote } from "./random-quotes-api.js";
import { appendNewElement } from "./utils.js";
import { YodaTranslator } from "./yoda-translator-api.js";

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
const yodaTranslationData = new YodaTranslator();

const yodaHumOne = new Audio("../assets/audio/yoda-1.mp3");
const yodaHumTwo = new Audio("../assets/audio/yoda-2.mp3");
const yodaHumThree = new Audio("../assets/audio/yoda-3.mp3");

const removeModifiers = (element) => {
  element.classList.remove(
    "weather-forecast__background--sunny",
    "weather-forecast__background--rainy",
    "weather-forecast__background--cloudy",
    "weather-forecast__background--snow",
    "weather-forecast__background--ice",
    "weather-forecast__background--thunder"
  );
};

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

  if (todayCondition.toLowerCase().includes("rain")) {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--rainy");
    yodaEl.setAttribute("src", "./assets/images/yoda.png");
  } else if (todayCondition.toLowerCase() === "sunny") {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--sunny");
    yodaEl.setAttribute("src", "./assets/images/yoda-sunny.png");
  } else if (
    todayCondition.toLowerCase().includes("cloudy") ||
    todayCondition.toLowerCase() === "overcast" ||
    todayCondition.toLowerCase() === "mist" ||
    todayCondition.toLowerCase() === "fog"
  ) {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--cloudy");
    yodaEl.setAttribute("src", "./assets/images/yoda.png");
  } else if (todayCondition.toLowerCase().includes("snow")) {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--snow");
  } else if (
    todayCondition.toLowerCase().includes("ice") ||
    todayCondition.toLowerCase().includes("freezing")
  ) {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--ice");
  } else if (todayCondition.toLowerCase().includes("thunder")) {
    removeModifiers(backgroundEl);
    backgroundEl.classList.add("weather-forecast__background--thunder");
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

const getTranslation = async (quote) => {
  try {
    const quoteToJSON = JSON.stringify(quote);
    const translation = await yodaTranslationData.translateQuote(quoteToJSON);
    return translation;
  } catch {
    return quote;
  }
};

const getQuote = async () => {
  try {
    yodaQuoteContainer.innerHTML = "";

    const quote = await quoteData.getQuote();

    const quoteEl = appendNewElement(
      yodaQuoteContainer,
      "p",
      "yoda-quote__quote"
    );

    const yodaQuote = await getTranslation(quote);

    quoteEl.innerText = `${yodaQuote}`;
  } catch (error) {
    console.error(error);
  }
};

buttonDayOne.addEventListener("click", async () => {
  await getWeather("London", 0);
  getQuote();
  yodaHumOne.play();
});

buttonDayTwo.addEventListener("click", async () => {
  await getWeather("London", 1);
  getQuote();
  yodaHumTwo.play();
});

buttonDayThree.addEventListener("click", async () => {
  await getWeather("London", 2);
  getQuote();
  yodaHumThree.play();
});
