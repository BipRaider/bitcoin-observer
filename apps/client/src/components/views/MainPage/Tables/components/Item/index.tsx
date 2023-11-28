import React from 'react';

import { Props } from './props';
import { DateFns } from '@src/libs';

export const Item: React.FC<Props> = ({ symbol, price, date, currency }): JSX.Element => {
  const dateFns = new DateFns();

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="hidden ss:flex px-2 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-start"
      >
        {symbol}
      </th>
      <td className="px-2 md:px-6 py-4">
        {`${dateFns.format(new Date(date))} ${dateFns.format2(new Date(date))}`}
      </td>

      <td className="px-2 md:px-6 py-4">{price}</td>
      <td className="hidden ss:flex px-2 md:px-6 py-4 text-center">{currency}</td>
    </tr>
  );
};
