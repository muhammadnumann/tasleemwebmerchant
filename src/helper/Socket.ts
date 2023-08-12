import axios from "axios"
import { io } from "socket.io-client"

const socketInitializer = async () => {
  const formData = new FormData()
  formData.append('id', '293')
  formData.append('type', '1')
  // setInterval(async () => {
  //   await axios.post('https://tasleem.in/api/frontend/web/index.php?r=api/account-retailer/simulate-notification', formData)
  // }, 1000 * 5)

  // const socket = io('https://tasleem.in/api/frontend/web/index.php?r=api/account-retailer/simulate-notification');


  // socket.emit('https://tasleem.in/api/frontend/web/index.php?r=api/account-retailer/simulate-notification', formData)
  // socket.on("socketio", (...args) => {
  //   console.log(args)
  // });
  // socket.on('connect', () => {
  //   console.log('connected')
  // })
}

export default socketInitializer;