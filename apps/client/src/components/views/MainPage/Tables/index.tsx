import React, { useEffect, useState } from 'react';

import { Props } from './props';

import { useCMCStore, useSessionStore, useToggleStore } from '@src/store';
import { useGetCryptoCoin } from '@src/hooks';
import { Button, Select } from '@src/components';
import { CryptoCoin, IntervalArr, ReqCMCGet, ValueInterval } from '@src/interfaces';

import { Item, Thead } from './components';

export const Tables: React.FC<Props> = (): JSX.Element => {
  const { toggles, setReload } = useToggleStore();
  const { get, reset } = useGetCryptoCoin();
  const {
    session: { user },
  } = useSessionStore();
  const {
    cmc: { coinList, coinNames, lastId, coinMap },
    setLastId,
  } = useCMCStore();

  const [itemList, setItems] = useState<CryptoCoin[]>([]);
  const [symbol, setSymbol] = useState<string>();
  const [interval, setInterval] = useState<ValueInterval>();

  useEffect(() => {
    if (user.id) if (!coinList.length) get({});
  }, []);

  useEffect(() => {
    if (user.id) {
      if (!coinList.length) get({});
      if (coinList.length) setItems(coinList);
    }
  }, [coinList]);

  useEffect(() => {
    try {
      if (toggles.reload && user.id) get({});
      if (toggles.reload && user.id) setReload.off();
    } catch {
      return;
    }
  }, [toggles.reload, user]);

  const resetItem = (list: CryptoCoin[] = [], id: string = '') => {
    setItems(list);
    if (list.length) id = list[list.length - 1].id || '';
    setLastId(id);
  };

  const sortItems = (key: string) => {
    const coins = coinMap.get(key);
    resetItem(coins);
  };

  useEffect(() => {
    if (user.id) {
      const { coinOptions } = user;
      if (interval && symbol) {
        sortItems(`${symbol}_${interval}`);
      } else if (interval && !symbol) {
        sortItems(`${coinOptions.coinNames[0]}_${interval}`);
      } else if (!interval && symbol) {
        sortItems(`${symbol}_${coinOptions.interval}`);
      } else if (!interval && !symbol) {
        sortItems(`${coinOptions.coinNames[0]}_${coinOptions.interval}`);
      }
    }
  }, [interval, symbol, coinMap]);

  const handlerPagination = async () => {
    if (user.id) {
      reset();
      const { coinOptions } = user;
      const payload: ReqCMCGet = {};
      if (lastId) payload.cursorId = lastId;
      if (coinOptions.interval) payload.interval = interval || coinOptions.interval;
      if (symbol) payload.symbol = symbol;
      get(payload);
    }
  };

  return (
    <div className="relative overflow-x-auto mb-2 mx-10">
      <div className="flex flex-row flex-wrap gap-1">
        <Select label={'Coin name'} setDispatch={setSymbol} data={coinNames} />
        <Select
          label={'Interval'}
          setDispatch={setInterval}
          data={IntervalArr}
          keyName="interval"
        />
        <Select label={'Coin name'} data={coinNames} />
        <Select label={'Coin name'} data={coinNames} />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <Thead />
        <tbody>
          {itemList.map(({ id, symbol, price, createdAt, currency }) => {
            return (
              <Item key={id} symbol={symbol} price={price} date={createdAt} currency={currency} />
            );
          })}
        </tbody>
      </table>
      <Button onClick={handlerPagination} className="mt-2">
        Add new item
      </Button>
    </div>
  );
};
