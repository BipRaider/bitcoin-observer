import React, { ChangeEvent } from 'react';
import cn from 'classnames';

import { Props } from './props';

export const InputDispatch: React.FC<Props> = ({
  className,
  setDispatch,
  name = 'value',
  type = 'text',
  required = false,
  ...props
}): JSX.Element => {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    if (setDispatch) setDispatch(e.target.value);
  };

  return (
    <input
      {...props}
      type={type}
      id={name}
      onChange={handle}
      className={cn(
        'block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900',
        'focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:text-white',
        'dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
        className,
      )}
      required={required}
    />
  );
};
