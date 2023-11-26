import React from 'react';
import cn from 'classnames';

import { Props } from './props';

export const ButtonClose: React.FC<Props> = ({
  onClick,
  className,
  type = 'button',
  children,
}): JSX.Element => {
  return (
    <button
      type={type}
      data-drawer-hide="drawer-example"
      aria-controls="drawer-example"
      className={cn(
        'flex items-center justify-center',
        'text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900',
        'text-sm w-8 h-8 absolute top-2.5 end-2.5 rounded-lg',
        'dark:hover:bg-gray-600 dark:hover:text-white',
        className,
      )}
      onClick={onClick}
    >
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span className="sr-only">{children}</span>
    </button>
  );
};
