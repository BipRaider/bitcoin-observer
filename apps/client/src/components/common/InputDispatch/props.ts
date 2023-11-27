import { InputHTMLAttributes, DetailedHTMLProps, ReactNode, SetStateAction, Dispatch } from 'react';

export interface Props
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  name: string;
  placeholder?: string;
  setDispatch: Dispatch<SetStateAction<any | null>>;
}
