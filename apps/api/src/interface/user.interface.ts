import { User, CoinOptions } from '@prisma/client';

export interface JWTUser extends Omit<ResUser, 'passwordHash' | 'username'> {
  coinOptions: CoinOptions;
}

export interface ResUser extends User {
  coinOptions: CoinOptions;
}

export interface ReqUser {
  user: JWTUser;
}
