import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  setValue?: Dispatch<SetStateAction<any | null>>;
  label: string;
  data?: string[] | Record<string, any>[];
}
