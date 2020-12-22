import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNodes } from 'src/store/node/action';
import { fetchDids } from 'src/store/did/action';

export const useInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNodes());
    dispatch(fetchDids());
  }, []);
};
