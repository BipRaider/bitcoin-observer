export const ConstantInterval = {
  ONE: 'ONE',
  THIRTY: 'THIRTY',
  SIXTY: 'SIXTY',
} as const;

export type TypeInterval = typeof ConstantInterval;
export type ValueInterval = (typeof ConstantInterval)[keyof typeof ConstantInterval];

export const IntervalArr: Record<string, any>[] = [
  { id: 1, interval: ConstantInterval.ONE, name: '1min' },
  { id: 2, interval: ConstantInterval.THIRTY, name: '30min' },
  { id: 3, interval: ConstantInterval.SIXTY, name: '60min' },
];
