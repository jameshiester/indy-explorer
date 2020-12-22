import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NODE_UPDATE, INode, IDid, DID_UPDATE } from 'model';
import { NODES_UPDATE_ACTION } from '@store/node/types';
import { Socket } from 'socket.io-client';
import SocketContext from '../context/socket';
import { DIDS_UPDATE_ACTION } from '@store/did/types';

export const useSocket = (socket: typeof Socket) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on(NODE_UPDATE, (data: INode) => {
      dispatch({ type: NODES_UPDATE_ACTION, value: [data] });
    });
    socket.on(DID_UPDATE, (data: Array<IDid>) => {
      dispatch({ type: DIDS_UPDATE_ACTION, value: data });
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
