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
  const { setSingUpToggle, setSingInToggle } = useToggleStore();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = useCallback(
    async (req: ReqUserSignUp): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        setSingUpToggle.on();
        setSingInToggle.off();

        const res = await db.post<ReqUserSignUp, ResUserSignUp>('/auth/signup', req);
        if (isErrorRes(res)) {
          setError(res);
          setSingUpToggle.on();
        } else {
          setData(true);
          setSingUpToggle.off();
          setSingInToggle.on();
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
        setSingUpToggle.on();
      }

      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(false);
    setError(null);
    setSingUpToggle.off();
  }, [data, error]);

  return { data, error, isLoading, create, reset };
};
