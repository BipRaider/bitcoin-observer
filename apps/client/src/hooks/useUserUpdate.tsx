import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ReqUpdateUser, ResUpdateUser } from '../interfaces';
import { useSessionStore } from '@src/store';
import { useToggleStore } from '@src/store';

export const useUserUpdate = (): {
  data: boolean;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  update: (req: ReqUpdateUser) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();
  const { addUser } = useSessionStore();
  const { setReload } = useToggleStore();
  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const update = useCallback(
    async (req: ReqUpdateUser): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await db.patch<ReqUpdateUser, ResUpdateUser>('/users/update', req);

        if (isErrorRes(res)) {
          setError(res);
        } else {
          setData(true);
          setReload.on();
          addUser(res.data);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }

      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setData(false);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, update, reset };
};
