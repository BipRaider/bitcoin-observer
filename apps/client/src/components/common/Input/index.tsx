import React from 'react';
import cn from 'classnames';

import { Props } from './props';

export const Input: React.FC<Props> = ({
  register,
  name = 'value',
  type = 'text',
  placeholder = 'Enter value',
  className,
  required = false,
  ...props
}): JSX.Element => {
  return (
    <input
      {...props}
      {...register(name)}
      type={type}
      id={name}
      className={cn(
        'shadow-sm bg-gray-50 border border-gray-300',
        'text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500',
        'block w-full p-2.5',
        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
        'dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light',
        className,
      )}
      placeholder={placeholder}
      required={required}
    />
  );
};
