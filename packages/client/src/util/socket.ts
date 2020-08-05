import io from 'socket.io-client';
let socket;

export const initiateSocket = () => {
  socket = io('/');
};
