import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';

import { ValueInterval, ResCMCGet, CryptoCoin } from '@src/interfaces';
import { filterCC, sortCC } from './helperStore';

enableMapSet();

interface State {
  cmc: {
    lastId: string;
    interval: ValueInterval;
    coinNames: string[];
    coinList: CryptoCoin[];
    coinMap: Map<string, CryptoCoin[]>;
  };
}

type Actions = {
  reset: () => void;
  addCMC: (payload: ResCMCGet) => void;
  addNewCoins: (payload: ResCMCGet) => void;
};

const BaseState: State = {
  cmc: {
    interval: 'ONE',
    coinNames: [],
    coinList: [],
    coinMap: new Map<string, CryptoCoin[]>(),
    lastId: '',
  },
};

export type CMCState = State & Actions;

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addCMC: (payload: ResCMCGet): void => {
      return set(state => {
        if (payload.interval) state.cmc.interval = payload.interval;
        if (payload.coinNames.length) state.cmc.coinNames = payload.coinNames;
        if (payload.data.length) state.cmc.coinList = payload.data;

        const lastId = payload.data.pop()?.id;
        if (lastId) state.cmc.lastId = lastId;

        if (payload.data.length > 0) {
          const { sort } = sortCC(payload.data);
          for (const coin in sort) {
            state.cmc.coinMap.set(`${coin}_${payload.interval}`, sort[coin]);
          }
        }
      });
    },
    addNewCoins: (payload: ResCMCGet): void => {
      return set(state => {
        if (payload.data.length > 0) {
          const { data } = payload;

          const lastId = data?.pop()?.id;
          if (lastId) state.cmc.lastId = lastId;

          const { arr, sort } = filterCC([...state.cmc.coinList, ...data]);

          state.cmc.coinList = arr;

          for (const coin in sort) {
            const key = `${coin}_${payload.interval}`;
            if (sort[coin]?.length) state.cmc.coinMap.set(key, sort[coin]);
            else state.cmc.coinMap.set(key, sort[coin]);
          }
        }
      });
    },
  }));

export const storeCMC = create(stateCreator());

export const useCMCStore = (initProps?: Partial<State>): CMCState => {
  const state = useStore(storeCMC, state => state);

  if (initProps) return state;
  return state;
};
