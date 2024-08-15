import axios from "./axios.js";

export class YodaTranslator {
  async translateQuote(quote) {
    const response = await axios.get(
      `https://api.funtranslations.com/translate/yoda?text=${quote}`
    );

    const translation = response.data.contents.translated;
    return translation;
  }
}
