import axios from "axios";

class CoinDeskService {
  constructor() {}
  getPosts() {
    return axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => response);
  }
}

export default CoinDeskService;
