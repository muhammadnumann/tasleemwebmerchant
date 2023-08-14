import { ErrorDialog, SuccessDialog } from "@/components/ui/Dailog"
import { postRequest } from "."
import { VENDOR_STATUS } from "./ApiConstants"
import { getLocalStorage } from "../store/Auth/AuthActions"

export const VendorStatus = async () => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  formData.append('vendor_id', user.userRetailer.id)

  try {
    const res = await postRequest(VENDOR_STATUS, formData)
    return res
  } catch (error) {
  }
}

