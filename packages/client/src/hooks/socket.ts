import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NODE_UPDATE, INode } from 'model';
import { NODES_UPDATE_ACTION } from '@store/node/types';
import { Socket } from 'socket.io-client';
import SocketContext from '../context/socket';

export const useSocket = (socket: typeof Socket) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on(NODE_UPDATE, (data: INode) => {
      dispatch({ type: NODES_UPDATE_ACTION, value: [data] });
    });
  }, [dispatch]);
};

export const useSocketSubscription = <T>(
  topic: string,
  callback: (data: T) => void
) => {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on(topic, (data: T) => {
      callback(data);
    });
  }, [dispatch, socket]);
};
