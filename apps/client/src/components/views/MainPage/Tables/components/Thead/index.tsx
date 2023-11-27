import React from 'react';

import { Props } from './props';

export const Thead: React.FC<Props> = ({ children, ...pros }): JSX.Element => {
  return (
    <thead
      {...pros}
      className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" className="md:px-6 px-1 py-3 max-w-[30px] text-start">
          Coin Name
        </th>
        <th scope="col" className="md:px-6 px-1 py-3 text-start">
          Date/Time
        </th>
        <th scope="col" className="md:px-6 px-1 py-3 text-start">
          Price
        </th>
        <th scope="col" className="md:px-3 px-1 py-3 max-w-[30px] text-center">
          Currency
        </th>
        {children}
      </tr>
    </thead>
  );
};
