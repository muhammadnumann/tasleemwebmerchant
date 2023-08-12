import { ErrorDialog } from "@/components/ui/Dailog"
import { postRequest } from "."
import { LOGIN_URL } from "./ApiConstants"

export const UserLogin = async (data: any) => {
  const formData = new FormData()
  formData.append('email', data.email)
  formData.append('password', data.password)
  try {
    let response: any = await postRequest(LOGIN_URL, formData)
    return response
  } catch (error) {
    if (error !== 'Network Error') {
      ErrorDialog(error);
    }
  }
}