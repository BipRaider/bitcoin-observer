import React from 'react';
import cn from 'classnames';

import { Props } from './props';

export const Label: React.FC<Props> = ({ htmlFor, className, children, ...props }): JSX.Element => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className={cn('block mb-2  text-sm font-medium text-gray-900 dark:text-white', className)}
    >
      {children}
    </label>
  );
};
