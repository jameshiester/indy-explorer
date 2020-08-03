import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNodes } from 'src/store/node/action';

export const useInit = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNodes());
  }, []);
};
