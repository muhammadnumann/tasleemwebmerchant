import { message as MessageAlert } from 'antd'

export const ErrorDialog = (msg: any) => {
  console.log(msg)
  const error = msg?.error
  let errorMessag = ""
  for (const key in error) {
    errorMessag = errorMessag + error[key]
  }
  MessageAlert.error(msg.message ? msg.message + ' : ' : msg + errorMessag)
};
export const SuccessDialog = (msg: any) => {
  MessageAlert.success(msg)
};
