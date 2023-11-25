import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  user: Record<string, unknown>;
}

type Actions = {
  addUser: (user: Partial<State['user']>) => void;
};

const BaseState: State = {
  user: {
    id: '',
    username: '',
    email: null,
  },
};

export type UserState = State & Actions;

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUser: (user: Partial<State['user']>): void => {
      return set(state => {
        if (user.id) state.user.id = user.id;
        if (user.username) state.user.name = user.name;
        if (user.email) state.user.email = user.email;
      });
    },
  }));

export const storeUser = create(stateCreator());

export const useUserStore = (initProps?: Partial<State>): UserState => {
  const state = useStore(storeUser, state => state);

  if (initProps) {
    if (initProps.user) {
      state.addUser(initProps.user);
    }
  }

  return state;
};
