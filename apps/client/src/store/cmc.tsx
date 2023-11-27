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
  setLastId: (id: string) => void;
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
    setLastId: (id: string): void => {
      return set(state => {
        state.cmc.lastId = id;
      });
    },
    addCMC: (payload: ResCMCGet): void => {
      return set(state => {
        if (payload.interval) state.cmc.interval = payload.interval;
        if (payload.coinNames.length) state.cmc.coinNames = payload.coinNames;
        if (payload.data.length) state.cmc.coinList = payload.data;

        if (payload.data.length > 0) {
          const { sort } = sortCC(payload.data);
          for (const key in sort) {
            state.cmc.coinMap.set(key, sort[key]);
          }
        }

        const lastId = payload.data[payload?.data?.length - 1].id;

        if (lastId) state.cmc.lastId = lastId;
      });
    },
    addNewCoins: (payload: ResCMCGet): void => {
      return set(state => {
        if (payload.interval) state.cmc.interval = payload.interval;
        if (payload.coinNames.length) state.cmc.coinNames = payload.coinNames;
        if (payload.data.length > 0) {
          const { data } = payload;
          const { arr, sort } = filterCC([...state.cmc.coinList, ...data]);

          state.cmc.coinList = arr;

          for (const key in sort) {
            if (sort[key]?.length) state.cmc.coinMap.set(key, sort[key]);
            else state.cmc.coinMap.set(key, sort[key]);
          }

          const lastId = data[data.length - 1].id;
          if (lastId) state.cmc.lastId = lastId;
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
