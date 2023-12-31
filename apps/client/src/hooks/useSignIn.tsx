import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ReqUserSignIn, ResUserSignIn } from '../interfaces';
import { useSessionStore, useToggleStore } from '@src/store';

export const useSignIn = (): {
  data: boolean;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  get: (req: ReqUserSignIn) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();
  const { addUser } = useSessionStore();
  const { setSingInToggle, setIsAuthToggle, setReload, setSingUpToggle } = useToggleStore();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = useCallback(
    async (req: ReqUserSignIn): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        setSingInToggle.on();

        const res = await db.post<ReqUserSignIn, ResUserSignIn>('/auth/signin', req);

        if (isErrorRes(res)) {
          setError(res);
          setSingInToggle.on();
        } else {
          setData(true);
          addUser(res.data);
          setIsAuthToggle.on();
          setReload.on();
          setSingInToggle.off();
          setSingUpToggle.off();
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
        setSingInToggle.on();
      }

      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(false);
    setError(null);
    setSingInToggle.off();
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
