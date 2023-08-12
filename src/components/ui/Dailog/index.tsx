import Swal from 'sweetalert2';
import { message as MessageAlert } from 'antd'

export const ErrorDialog = (msg: any) => {
  Swal.fire(msg, '', 'error');
  MessageAlert.error(msg)

};
export const SuccessDialog = (msg: any) => {
  MessageAlert.success(msg)
};
