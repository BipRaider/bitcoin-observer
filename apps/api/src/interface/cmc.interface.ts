export const ConstantInterval = {
  ONE: 'ONE',
  THIRTY: 'THIRTY',
  SIXTY: 'SIXTY',
} as const;

export type TypeInterval = typeof ConstantInterval;
export type ValueInterval = (typeof ConstantInterval)[keyof typeof ConstantInterval];

export interface CoinQuoteCMC {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  last_updated: Date;
}

export interface CoinCMC {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  last_updated: Date;
  quote: Record<string, CoinQuoteCMC>;
}

export interface StatusCMC {
  timestamp: Date;
  error_code: number;
  error_message: string;
}

export interface ResCMC {
  status: StatusCMC;
  data: Record<string, CoinCMC[]>;
}
