import { ValueInterval } from './types';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface CoinOptions {
  coinNames: string[];
  interval: ValueInterval;
  upperPrice: number;
  middlePrice: number;
  lowerPrice: number;
}

export interface UserSession {
  id: User['id'];
  username: User['username'];
  coinOptions: CoinOptions;
  access_token: string;
}

export interface ReqUserSignUp extends Omit<User, 'id'> {}
export interface ResUserSignUp {
  status: string;
  data: Record<string, unknown>;
}

export interface ReqUpdateUser {
  username?: string;
  coinNames?: string;
  upperPrice?: number;
  middlePrice?: number;
  lowerPrice?: number;
  interval?: ValueInterval;
}
export interface ResUpdateUser {
  status: string;
  data: UserSession;
}

export interface ReqUserSignIn extends Omit<User, 'id' | 'username'> {}
export interface ResUserSignIn {
  status: string;
  data: UserSession;
}
