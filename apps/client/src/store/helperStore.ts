import { CryptoCoin } from '@src/interfaces';

type SortCC = {
  map: Map<string, CryptoCoin>;
  sort: Record<string, CryptoCoin[]>;
};

type FilterCC = SortCC & {
  arr: CryptoCoin[];
};

export const sortCC = (data: CryptoCoin[]): SortCC => {
  const map: Map<string, CryptoCoin> = new Map();
  const sort: Record<string, CryptoCoin[]> = {};

  for (const coin of data) {
    map.set(coin.id, coin);

    const key = `${coin.symbol}_${coin.interval}`;
    if (!sort[key]?.length) sort[key] = [];
    sort[key].push(coin);
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
