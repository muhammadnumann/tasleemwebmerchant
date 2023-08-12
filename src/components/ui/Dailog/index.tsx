import Swal from 'sweetalert2';

export const ErrorDialog = (msg: any) => {
  Swal.fire(msg, '', 'error');
};
export const SuccessDialog = (msg: any) => {
  Swal.fire(msg, '', 'success');
};
