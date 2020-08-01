import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';

const VALIDATORS_KEY = 'validators';

export const useValidators = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryFn = async (...args: any[]) => {
    const response = await fetch('/api/status');
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw `Failed to reach validator service`;
    }
  };
  return useQuery({
    queryKey: VALIDATORS_KEY,
    queryFn,
    config: {
      onError: (err: any) =>
        enqueueSnackbar(err, {
          variant: 'error',
        }),
    },
  });
};
