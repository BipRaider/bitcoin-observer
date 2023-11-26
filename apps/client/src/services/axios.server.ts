import axios, { AxiosStatic } from 'axios';

const config = import.meta.env;

export class AxiosServer {
  public axiosRef: AxiosStatic = axios;

  constructor() {
    const baseURL = 'http://localhost:8080/';
    const url = config.DEV ? baseURL : `${config.VITE_API_URL}/`;

    this.axiosRef.defaults.baseURL = url;
    this.axiosRef.defaults.headers.get['Accept'] = 'application/json';
    this.axiosRef.defaults.headers.common['Content-Type'] = 'application/json';
  }

  public readSession = <T>(key: string, defaultValue: T): T => {
    const stored = sessionStorage.getItem(key);
    if (!stored) return defaultValue;
    return JSON.parse(stored);
  };

  public writeSession = <T>(item: string, payload: T): void => {
    sessionStorage.setItem(item, JSON.stringify(payload));
  };

  public setToken(token: string = ''): string {
    const accessToken = this.readSession<string>('accessToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    if (token) this.writeSession<string>('accessToken', token);
    return accessToken;
  }

  public unsetToken(): void {
    axios.defaults.headers.common['Authorization'] = '';
  }
}
