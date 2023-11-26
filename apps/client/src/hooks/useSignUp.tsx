import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ReqUserSignUp, ResUserSignUp } from '../interfaces';
import { useToggleStore } from '@src/store';

export const useSignUp = (): {
  data: boolean;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  create: (req: ReqUserSignUp) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();
  const { setSingUpToggle } = useToggleStore();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = useCallback(
    async (req: ReqUserSignUp): Promise<void> => {
      setSingUpToggle.off;
      setIsLoading(true);
      setError(null);

      try {
        const res = await db.post<ReqUserSignUp, ResUserSignUp>('/auth/signup', req);
        if (isErrorRes(res)) {
          setError(res);
          setSingUpToggle.off;
        } else {
          setData(true);
          setSingUpToggle.on;
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
        setSingUpToggle.off;
      }

      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(false);
    setError(null);
    setSingUpToggle.off;
  }, [data, error]);

  return { data, error, isLoading, create, reset };
};
