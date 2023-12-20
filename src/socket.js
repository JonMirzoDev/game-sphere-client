// src/socket.js
import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000'; // Your server URL
const socket = io(ENDPOINT);

export default socket;
