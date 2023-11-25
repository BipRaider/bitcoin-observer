import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface State {}

export type Actions = {
  addUser: (user: Record<string, unknown>) => void;
  reset: () => void;
};
export type SessionState = State & Actions;

const baseUser = {};

const BaseState: State = {
  session: { user: baseUser },
};

const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUser: (user: Record<string, unknown>): void => {
      return set(state => {
        if (user.name) state.session.user.name = user.name;
        if (user.email) state.session.user.email = user.email;
        if (user.password) state.session.user.password = user.password;
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

  if (initProps) {
    console.dir('first');
  }

  return state;
};
