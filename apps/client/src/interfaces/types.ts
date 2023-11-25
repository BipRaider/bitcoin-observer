export const ConstantInterval = {
  ONE: 'ONE',
  THIRTY: 'THIRTY',
  SIXTY: 'SIXTY',
} as const;

export type TypeInterval = typeof ConstantInterval;
export type ValueInterval = (typeof ConstantInterval)[keyof typeof ConstantInterval];
