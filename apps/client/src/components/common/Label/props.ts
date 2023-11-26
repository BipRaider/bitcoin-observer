import { LabelHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface Props
  extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: ReactNode;
  htmlFor: string;
}
