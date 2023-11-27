import { useCallback, useState } from 'react';
import { DBServer, ErrorRes, isErrorRes } from '../services';
import { ResCMCGet, ReqCMCGet } from '../interfaces';
import { useCMCStore } from '@src/store';

export const useGetCryptoCoin = (): {
  data: boolean;
  error: ErrorRes | Error | null;
  isLoading: boolean;
  get: (req: ReqCMCGet) => Promise<void>;
  reset: () => void;
} => {
  const db = new DBServer();
  const { cmc, addCMC, addNewCoins } = useCMCStore();

  const [data, setData] = useState<boolean>(false);
  const [error, setError] = useState<ErrorRes | Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = useCallback(
    async (req: ReqCMCGet = {}): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        let res: ErrorRes | ResCMCGet;
        if (req) res = await db.post<ReqCMCGet, ResCMCGet>('/coinmarketcap', req);
        else res = await db.get<undefined, ResCMCGet>('/coinmarketcap', req);
        if (isErrorRes(res)) {
          setError(res);
        } else {
          setData(true);
          if (!cmc.coinList.length) addCMC(res);
          else addNewCoins(res);
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

  return { data, error, isLoading, get, reset };
};
