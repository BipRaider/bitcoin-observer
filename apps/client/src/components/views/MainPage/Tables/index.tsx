import React, { useEffect, useState } from 'react';

import { Props } from './props';

import { useCMCStore, useSessionStore, useToggleStore } from '@src/store';
import { useGetCryptoCoin } from '@src/hooks';
import { Button, InputDispatch, Label, Select } from '@src/components';
import { CryptoCoin, IntervalArr, ReqCMCGet, ValueInterval } from '@src/interfaces';

import { Item, Thead } from './components';
import { DateFns } from '@src/libs';

export const Tables: React.FC<Props> = (): JSX.Element => {
  const dateFns = new DateFns();
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
  const [take, setTake] = useState<number>(20);
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const [skip, setSkip] = useState<number>(0);

  const sortByDate = (list: CryptoCoin[]): CryptoCoin[] => {
    if (!from && !to) return list;
    return list.filter(coin => {
      if (dateFns.isPeriod(coin.createdAt, { from, to })) return coin;
    });
  };

  const resetItem = (list: CryptoCoin[] = [], id: string = '') => {
    const sort = sortByDate(list);
    setItems(sort);
    if (list.length) id = list[list.length - 1].id || '';
    setLastId(id);
  };

  const sortItems = (key: string) => {
    const coins = coinMap.get(key);
    resetItem(coins);
  };

  const handlerPagination = async () => {
    if (user.id) {
      reset();
      const { coinOptions } = user;
      const payload: ReqCMCGet = {};

      if (lastId && skip) payload.cursorId = lastId;
      if (coinOptions.interval) payload.interval = interval || coinOptions.interval;
      if (symbol) payload.symbol = symbol;
      if (from) payload.from = from;
      if (to) payload.to = to;

      if (take) {
        const takeSet = Math.abs(Number(take));
        payload.take = takeSet > 200 ? 200 : takeSet;
        setTake(payload.take);
      }

      get(payload);
      setSkip(1);

      console.dir(skip);
    }
  };

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
    if (from) setSkip(0);
    if (to) setSkip(0);
    if (symbol) setSkip(0);
    if (interval) setSkip(0);
  }, [from, to, symbol, interval]);

  useEffect(() => {
    if (user.id) {
      const { coinOptions } = user;
      const baseKey = `${coinOptions.coinNames[0]}_${coinOptions.interval}`;
      if (interval && symbol) sortItems(`${symbol}_${interval}`);
      else if (interval && !symbol) sortItems(`${coinOptions.coinNames[0]}_${interval}`);
      else if (!interval && symbol) sortItems(`${symbol}_${coinOptions.interval}`);
      else if (!interval && !symbol) sortItems(baseKey);
    }
  }, [interval, symbol, coinMap, from, to]);

  useEffect(() => {
    try {
      if (toggles.reload && user.id) handlerPagination();
      if (toggles.reload && user.id) setReload.off();
    } catch {
      return;
    }
  }, [toggles.reload, user]);

  return (
    <div className="relative overflow-x-auto mb-2 md:mx-10 mx-1">
      <div className="flex flex-row flex-wrap gap-2 justify-center content-center">
        <Select
          label={'Coin name'}
          setDispatch={setSymbol}
          data={coinNames}
          className="w-full ss:w-[150px]"
        />
        <Select
          label={'Interval'}
          setDispatch={setInterval}
          data={IntervalArr}
          keyName="interval"
          className="w-full ss:w-[150px]"
        />
        <div className="w-full ss:w-[150px]">
          <Label htmlFor="take" className="uppercase">
            Date from
          </Label>
          <InputDispatch name={'from'} setDispatch={setFrom} type="datetime-local" />
        </div>
        <div className="w-full ss:w-[150px]">
          <Label htmlFor="take" className="uppercase">
            Date to
          </Label>
          <InputDispatch name={'to'} setDispatch={setTo} type="datetime-local" />
        </div>
        <div className="w-full ss:w-[150px]">
          <Label htmlFor="take" className="uppercase">
            Take coins
          </Label>
          <InputDispatch
            name={'take'}
            value={take}
            setDispatch={setTake}
            min={1}
            max={200}
            type="number"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2">
        <Thead />
        <tbody>
          {itemList.map(({ id, symbol, price, createdAt, currency }) => {
            return (
              <Item key={id} symbol={symbol} price={price} date={createdAt} currency={currency} />
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row flex-wrap gap-2 justify-center content-center">
        <Button onClick={handlerPagination}>Add new item</Button>
        <div className="w-[100px] text-center">
          <InputDispatch
            name={'take'}
            value={take}
            setDispatch={setTake}
            min={1}
            max={200}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};
