import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
  children?: ReactNode;
}
