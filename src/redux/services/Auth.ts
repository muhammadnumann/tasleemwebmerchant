import { ErrorDialog } from "@/components/ui/Dailog"
import { postRequest } from "."
import { LOGIN_URL, MERCHANT_LOGIN_URL } from "./ApiConstants"

export const UserLogin = async (data: any) => {
  const formData = new FormData()
  let url = ''
  if (data.email.includes('@')) {
    formData.append('email', data.email)
    url = LOGIN_URL
  }
  else {
    url = MERCHANT_LOGIN_URL
    formData.append('merchantId', data.email)
  }

  formData.append('password', data.password)
  try {
    let response: any = await postRequest(url, formData)
    return response
  } catch (error) {
    if (error !== 'Network Error') {
      ErrorDialog(error);
    }
  }
}