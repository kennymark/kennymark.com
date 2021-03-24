import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.tidalhifi.com/v1/login/username',

  headers: {
    'X-Tidal-Token': 'wc8j_yBJd20zOmx0',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
})

interface LoginInfo {
  username: string;
  password: string;
}


export class Tidal {

  private _userId: string;
  private _sessionId: string;
  private _countryCode: string | null = null;

  private searchParams = {
    offset: '0',
    limit: '50',
    order: 'DATE',
    orderDirection: 'DESC',
    locale: 'en_US',
    deviceType: 'BROWSER',
    countryCode: 'TR'
  }


  private defaultHeaders = {}

  constructor(login: LoginInfo) {

    if (typeof login.username !== 'string') {
      throw new Error('Username invalid or missing');
    }
    if (typeof login.password !== 'string') {
      throw new Error('Password invalid or missing');
    }

    this.login()

    this.defaultHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Tidal-SessionId': this._sessionId
    }
  }

  public async login() {

    const res = await api.post('/login/username', this.login)

    const data = res.data

    this._userId = data.userId
    this._countryCode = data.countryCode

  }

  public async getMyFavTracks() {
    let data
    const options = {
      method: 'GET',
      url: 'https://api.tidalhifi.com/v1/users/174928383/favorites/tracks',
      params: {
        offset: '0',
        limit: '50',
        order: 'DATE',
        orderDirection: 'DESC',
        locale: 'en_US',
        deviceType: 'BROWSER',
        countryCode: 'TR'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Tidal-SessionId': 'abed6e77-2923-4737-8ae3-9197e995c8f3'
      },
      data: {}
    };


    axios.request(options as any).then(function (response) {
      console.log(response.data);
      data = response.data
    }).catch(function (error) {
      console.error(error);
    });

    return data;
  }



}