import { io } from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_BASEURL
// const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT);

export default socket;
