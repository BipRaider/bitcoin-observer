import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
  isShowing: boolean;
  title: string;
  onShow: (value: boolean) => void;
  left?: boolean;
}
