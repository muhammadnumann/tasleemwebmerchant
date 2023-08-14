import axios from "axios"
import { io } from "socket.io-client"


const socket = io('https://tasleem.in/api/frontend/web/index.php?r=api/account-retailer/simulate-notification', {
  autoConnect: true
}); // Connect to the Socket.IO server

export default socket