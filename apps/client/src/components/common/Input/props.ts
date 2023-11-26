import { InputHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface Props
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children?: ReactNode;
  register: UseFormRegister<any>;
  name: string;
  placeholder?: string;
}
