import axios from "./axios.js";

export class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://api.weatherapi.com/v1/forecast.json";
  }

  async getWeather(city) {
    const response = await axios.get(
      `${this.baseUrl}?q=${city}&days=3&key=${this.apiKey}`
    );

    const forecastData = response.data.forecast.forecastday;
    return forecastData;
  }
}
