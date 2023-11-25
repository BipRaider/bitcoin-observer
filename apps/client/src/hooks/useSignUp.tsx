import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ReqUserSignUp } from '../interfaces';

export const useSignUp = (): {
  data: ReqUserSignUp | null;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  create: (req: ReqUserSignUp) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();

  const [data, setData] = useState<ReqUserSignUp | null>(null);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const create = useCallback(
    async (req: ReqUserSignUp): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await db.post<ReqUserSignUp, ReqUserSignUp>('/auth/signup', req);

        if (isErrorRes(res)) setError(res);
        else setData(res);
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, create, reset };
};
