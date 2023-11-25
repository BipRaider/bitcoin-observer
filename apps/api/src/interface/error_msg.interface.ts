export const ConstantError = {
  USER_NOT_FOUND: 'User not found!',
  USER_ALREADY_EXIST: 'User already exists!',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect!',
  EMAIL: 'The email is incorrect',
  PASSWORD: 'The password is incorrect',
  USERNAME: 'The username is incorrect',
  UPPER_PRICE: 'The upperPrice is incorrect',
  MIDDLE_PRICE: 'The middlePrice is incorrect',
  LOWER_PRICE: 'The lowerPrice is incorrect',
  COIN_NAMES: 'The coinNames is incorrect',
  INTERVAL: 'The interval value is incorrect',
  VALUE: 'The value is incorrect',
} as const;

export type TypeError = typeof ConstantError;
export type MessageError = (typeof ConstantError)[keyof typeof ConstantError];
