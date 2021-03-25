import axios from 'axios'

interface LoginInfo {
  username: string;
  password: string;
}



interface SearchParams {

  offset?: number | string,
  limit?: number | string;
  order?: string | 'DATE',
  orderDirection?: 'DESC' | 'ASC',
  countryCode: string

}

export default class Tidal {

  private _userId: string;
  private _sessionId: string;
  private _countryCode: string | null = "US";

  private api = axios.create({
    baseURL: 'https://api.tidalhifi.com/v1',
    headers: {
      'X-Tidal-Token': 'wc8j_yBJd20zOmx0',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })

  private searchParams: SearchParams = {
    offset: 0,
    limit: 50,
    order: 'DATE',
    orderDirection: 'DESC',
    countryCode: this._countryCode
  }

  private headers: { [x: string]: string }


  constructor(private auth: LoginInfo) {

    if (typeof auth.username !== 'string') {
      throw new Error('Username invalid or missing');
    }
    if (typeof auth.password !== 'string') {
      throw new Error('Password invalid or missing');
    }

  }

  public async login() {
    const res = await this.api.post('/login/username', `username=${this.auth.username}&password=${this.auth.password}`)

    this._userId = res.data.userId;
    this._sessionId = res.data.sessionId;
    this.headers = { "X-Tidal-SessionId": this._sessionId }

    return res.data

  }

  public async getMyFavTracks(params = this.searchParams) {
    await this.login()

    const tracks = await this.api.get(`/users/${this._userId}/favorites/tracks`, { params, headers: this.headers })

    return tracks.data
  }
}