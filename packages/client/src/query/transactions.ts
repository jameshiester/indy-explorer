import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';

const TRANSACTIONS_KEY = 'transactions';

export const useTransactions = (ledger: string = 'domain') => {
  const { enqueueSnackbar } = useSnackbar();
  const queryFn = async (...args: any[]) => {
    const response = await fetch(`/api/ledger/${ledger}`);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw `Failed to reach Transaction service`;
    }
  };
  return useQuery({
    queryKey: [TRANSACTIONS_KEY, ledger],
    queryFn,
    config: {
      onError: (err: any) =>
        enqueueSnackbar(err, {
          variant: 'error',
        }),
    },
  });
};
