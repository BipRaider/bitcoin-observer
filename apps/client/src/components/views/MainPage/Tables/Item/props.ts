import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  children?: ReactNode;
  symbol: string;
  price: number;
  date: Date;
  currency: string;
}
