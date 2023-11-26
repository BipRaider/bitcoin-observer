import { AxiosError } from 'axios';

import { ValuePostUrl, ValueGetUrl, ValuePatchUrl, ErrorRes } from './interface';
import { AxiosServer } from './axios.server';

export class DBServer extends AxiosServer {
  constructor() {
    super();
  }

  public patch = async <REQ, RES>(
    url: ValuePatchUrl,
    body: REQ & { id: string },
  ): Promise<RES | ErrorRes> => {
    try {
      this.setToken();

      const { data } = await this.axiosRef.patch(`${url}`, body);

      if ('access_token' in data) this.writeSession('accessToken', data.access_token);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      throw error;
    }
  };

  public post = async <REQ, RES>(url: ValuePostUrl, body: REQ): Promise<RES | ErrorRes> => {
    try {
      this.setToken();

      const { data } = await this.axiosRef.post(url, body);

      if ('access_token' in data) this.writeSession('accessToken', data.access_token);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      throw error;
    }
  };

  public get = async <REQ, RES>(url: ValueGetUrl, params: REQ): Promise<RES | ErrorRes> => {
    try {
      this.setToken();

      const { data } = await this.axiosRef.get(url, { params });

      if ('access_token' in data) this.writeSession('accessToken', data.access_token);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) throw error;
      throw error;
    }
  };
}
