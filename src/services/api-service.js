export default class ApiService {

  _delay = '700ms';
  _apiBase = 'https://www.mocky.io/v2';
  _allCities = '5b34c0d82f00007400376066';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}/${url}?mocky-delay=${this._delay}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }

    return await res.json();
  }

  getAllCities = async () => {
    return await this.getResource(this._allCities);
  };

  getTimesAndDays = async (id) => {
    return await this.getResource(id);
  }

}

// const apiService = new ApiService();
// apiService.getAllCities().then((body) => {
//   console.log(body);
// });
