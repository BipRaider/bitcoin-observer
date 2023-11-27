export const GET_URL = {
  CMC: '/coinmarketcap',
} as const;
export type TypeGetUrl = typeof GET_URL;
export type ValueGetUrl = (typeof GET_URL)[keyof typeof GET_URL];

export const POST_URL = {
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  START: '/coinmarketcap/start',
  STOP: '/coinmarketcap/stop',
  CMC: '/coinmarketcap',
} as const;
export type TypePostUrl = typeof POST_URL;
export type ValuePostUrl = (typeof POST_URL)[keyof typeof POST_URL];

export const PATCH_URL = {
  USER_UPDATE: '/users/update',
} as const;
export type TypePatchUrl = typeof PATCH_URL;
export type ValuePatchUrl = (typeof PATCH_URL)[keyof typeof PATCH_URL];

export interface ErrorRes {
  message: string | string[];
  error: string;
  statusCode: number;
}

export type Dictionary = Record<string, any>;

export const isErrorRes = (err: ErrorRes | Dictionary): err is ErrorRes => {
  return 'error' in err && typeof err.error === 'string';
};
