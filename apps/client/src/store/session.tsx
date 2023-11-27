import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserSession } from '@src/interfaces';

export interface State {
  session: {
    user: UserSession;
    accessToken: UserSession['access_token'];
  };
}

export type Actions = {
  addUser: (user: UserSession) => void;
  addToken: (accessToken: UserSession['access_token']) => void;
  reset: () => void;
};
export type SessionState = State & Actions;

const baseUser: UserSession = {
  id: '',
  username: '',
  access_token: '',
  coinOptions: {
    coinNames: [],
    interval: 'ONE',
    upperPrice: 0,
    middlePrice: 0,
    lowerPrice: 0,
  },
};

const BaseState: State = {
  session: {
    user: baseUser,
    accessToken: '',
  },
};

const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUser: (user: UserSession): void => {
      return set(state => {
        if (user.username) state.session.user.username = user.username;
        if (user.id) state.session.user.id = user.id;
        if (user.coinOptions) state.session.user.coinOptions = user.coinOptions;
        if (user.access_token) state.session.accessToken = user.access_token;
      });
    },
    addToken: (accessToken: UserSession['access_token']): void => {
      return set(state => {
        if (accessToken) state.session.accessToken = accessToken;
      });
    },
  }));

const persistOpt = {
  name: 'sessionStore',
  storage: createJSONStorage(() => sessionStorage),
};

export const storeSession = create(persist(stateCreator(), persistOpt));

export const useSessionStore = (initProps?: Partial<State>): SessionState => {
  const state = useStore(storeSession, state => state);

  if (!initProps) state;
  return state;
};
