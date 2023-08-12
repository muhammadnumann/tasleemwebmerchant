import Swal from 'sweetalert2';
import { message as MessageAlert } from 'antd'

export const ErrorDialog = (msg: any) => {
  MessageAlert.error(msg.message)
};
export const SuccessDialog = (msg: any) => {
  MessageAlert.success(msg)
};
