import axios from "./axios.js";

export class RandomQuote {
  async getQuote() {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational&x-api-key=EfiZ0PrjXVMfUP951HCS7Q==42Re8AbipbqdATiC"
    );

    const quote = response.data[0].quote;
    return quote;
  }
}
