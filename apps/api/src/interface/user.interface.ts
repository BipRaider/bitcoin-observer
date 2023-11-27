import { User, CoinOptions } from '@prisma/client';

export interface JWTUser extends Omit<ResUser, 'passwordHash' | 'username'> {
  coinOptions: CoinOptions;
}

export interface ResSignIn {
  id: User['id'];
  username: User['username'];
  coinOptions: CoinOptions;
  access_token: string;
}

export type ResSignUp = Record<string, unknown>;

export interface ResUser extends User {
  coinOptions: CoinOptions;
}

export interface ReqUser {
  user: JWTUser;
}
