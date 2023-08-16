import { io } from "socket.io-client"


const socket = io('https://pubsub.tasleem.in/?token=iC_s7xcGe91UUHvyNl48', {
  autoConnect: true
}); // Connect to the Socket.IO server

export default socket