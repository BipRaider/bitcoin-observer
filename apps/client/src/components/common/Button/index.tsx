import React from 'react';
import cn from 'classnames';

import { Props } from './props';

export const Button: React.FC<Props> = ({
  onClick,
  className,
  type = 'button',
  children,
}): JSX.Element => {
  return (
    <button
      type={type}
      className={cn(
        'bg-white border border-gray-300 rounded-lg',
        'hover:bg-gray-100',
        'text-gray-900 font-medium text-sm px-5 py-2.5',
        'dark:bg-gray-800 dark:text-white dark:border-gray-600',
        'dark:hover:bg-gray-700 dark:hover:border-gray-600',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
