import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { NODE_UPDATE, INode } from 'model';
import { NODES_UPDATE_ACTION } from '@store/node/types';

export const useSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io('http://localhost:9000');
    socket.on(NODE_UPDATE, (data: INode) => {
      dispatch({ type: NODES_UPDATE_ACTION, value: [data] });
    });
  }, [dispatch]);
};
