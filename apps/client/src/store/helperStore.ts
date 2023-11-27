import { CryptoCoin } from '@src/interfaces';

type SortCC = {
  map: Map<string, CryptoCoin>;
  sort: Record<string, CryptoCoin[]>;
};

type FilterCC = SortCC & {
  arr: CryptoCoin[];
};

export const newMapCC = (data: CryptoCoin[]): Map<string, CryptoCoin> => {
  const map: Map<string, CryptoCoin> = new Map();
  for (const coin of data) map.set(coin.id, coin);
  return map;
};

export const sortCC = (data: CryptoCoin[]): SortCC => {
  const map: Map<string, CryptoCoin> = new Map();

  const sort: Record<string, CryptoCoin[]> = {};
  for (const coin of data) {
    if (!sort[coin.symbol]?.length) sort[coin.symbol] = [];
    sort[coin.symbol].push(coin);
    map.set(coin.id, coin);
  }
  return { sort, map };
};

export const filterCC = (data: CryptoCoin[]): FilterCC => {
  const { sort, map }: SortCC = sortCC(data);
  const arr: CryptoCoin[] = [];
  map.forEach(coin => arr.push(coin));
  return {
    map,
    arr,
    sort,
  };
};
