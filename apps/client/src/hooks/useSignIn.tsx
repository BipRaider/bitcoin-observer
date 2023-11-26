import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ReqUserSignIn, ResUserSignIn } from '../interfaces';
import { useToggleStore } from '@src/store';

export const useSignIn = (): {
  data: boolean;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  get: (req: ReqUserSignIn) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();
  const { setSingInToggle } = useToggleStore();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = useCallback(
    async (req: ReqUserSignIn): Promise<void> => {
      setSingInToggle.off;
      setIsLoading(true);
      setError(null);

      try {
        const res = await db.post<ReqUserSignIn, ResUserSignIn>('/auth/signin', req);
        if (isErrorRes(res)) {
          setError(res);
          setSingInToggle.off;
        } else {
          setData(true);
          setSingInToggle.on;
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
        setSingInToggle.off;
      }

      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(false);
    setError(null);
    setSingInToggle.off;
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
