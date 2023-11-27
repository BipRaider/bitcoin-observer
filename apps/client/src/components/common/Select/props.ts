import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  error?: string;
  setDispatch?: Dispatch<SetStateAction<any | null>>;
  label: string;
  data?: string[] | Record<string, any>[];
  name?: string;
  setValue?: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  setError?: UseFormSetError<any>;
  register?: UseFormRegister<any>;
  watch?: UseFormWatch<any>;
  errors?: FieldErrors<any>;
  keyName?: string;
}
