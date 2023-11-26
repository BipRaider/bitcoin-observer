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

export interface ReqUserSignUp extends Omit<User, 'id'> {}
export interface ResUserSignUp {
  data: Record<string, unknown>;
}

export interface ReqUserSignIn extends Omit<User, 'id' | 'username'> {}
export interface ResUserSignIn {
  access_token: string;
}
