import { ValueInterval } from './types';

export interface CryptoCoin {
  id: string;
  currency: string;
  price: number;
  coinId: number;
  name: string;
  symbol: string;
  slug: string;
  interval: ValueInterval;
  createdAt: Date;
}

export interface ResCMCGet {
  interval: ValueInterval;
  coinNames: string[];
  data: Pick<CryptoCoin, 'price' | 'symbol' | 'currency' | 'createdAt' | 'id'>[];
}
