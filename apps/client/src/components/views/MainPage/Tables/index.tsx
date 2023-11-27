import React, { useEffect } from 'react';

import { Props } from './props';
import { Item } from './Item';
import { useCMCStore, useSessionStore, useToggleStore } from '@src/store';
import { useGetCryptoCoin } from '@src/hooks';
import { Select } from '@src/components';
import { IntervalArr } from '@src/interfaces';

export const Tables: React.FC<Props> = (): JSX.Element => {
  const { toggles, setReload } = useToggleStore();
  const { get } = useGetCryptoCoin();
  const {
    session: { user },
  } = useSessionStore();
  const {
    cmc: { coinList, coinNames },
  } = useCMCStore();

  useEffect(() => {
    if (!coinList.length && user.id) get({});
  }, []);

  useEffect(() => {
    try {
      if (toggles.reload && user.id) get({});
      if (toggles.reload && user.id) setReload.off();
    } catch {
      return;
    }
  }, [toggles.reload, user]);

  return (
    <div className="relative overflow-x-auto mb-2 mx-10">
      <div className="flex flex-row flex-wrap gap-1">
        <Select label={'Coin name'} data={coinNames} />
        <Select label={'Interval'} data={IntervalArr} />
        <Select label={'Coin name'} data={coinNames} />
        <Select label={'Coin name'} data={coinNames} />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          </tr>
        </thead>
        <tbody>
          {coinList.map(({ id, symbol, price, createdAt, currency }) => {
            return (
              <Item key={id} symbol={symbol} price={price} date={createdAt} currency={currency} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
