import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  toggles: {
    reload: boolean;
    signInToggle: boolean;
    signUpToggle: boolean;
  };
}

interface ToggleBoolean {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

type Actions = {
  setReload: ToggleBoolean;
  setSingInToggle: ToggleBoolean;
  setSingUpToggle: ToggleBoolean;
};

export const toggle = (
  set: (
    state: (State & Actions) | Partial<State & Actions> | ((state: State & Actions) => void),
    shouldReplace?: boolean | undefined,
  ) => void,
  name: keyof State['toggles'],
): ToggleBoolean => {
  const fns: ToggleBoolean = {
    on: (): void => {
      return set(state => {
        state.toggles[name] = true;
      });
    },
    off: (): void => {
      return set(state => {
        state.toggles[name] = false;
      });
    },
    toggle: (): void => {
      return set(state => {
        state.toggles[name] = !state.toggles[name];
      });
    },
  };
  return fns;
};

export type ToggleState = State & Actions;

const BaseState: State = {
  toggles: {
    reload: false,
    signInToggle: false,
    signUpToggle: false,
  },
};

const stateCreator = (): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    reset: (): void => set(BaseState),
    setReload: toggle(set, 'reload'),
    setSingUpToggle: toggle(set, 'signUpToggle'),
    setSingInToggle: toggle(set, 'signInToggle'),
  }));

export const storeToggle = create(stateCreator());

export const useToggleStore = (): ToggleState => {
  const state = useStore(storeToggle, state => state);
  return state;
};
