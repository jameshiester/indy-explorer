import React from 'react';
import { Socket } from 'socket.io-client';

const SocketContext = React.createContext<typeof Socket>(
  (null as unknown) as typeof Socket
);

export default SocketContext;
