import { postRequest } from "."
import { getLocalStorage } from "../store/Auth/AuthActions"
import { PRODUCT_CANCEL_ORDER, PRODUCT_CONFIRM_ORDER, PRODUCT_DETAIL_ORDER, PRODUCT_ORDER_LIST, PRODUCT_READY_ORDER } from "./ApiConstants"
import { ErrorDialog, SuccessDialog } from "@/components/ui/Dailog"

export const ProductOrderListingApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("store_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await postRequest(PRODUCT_ORDER_LIST, formData)
    return res
  } catch (error) {

  }
}

export const ProductOrderDetailById = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("store_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  for (const key in data) {
    formData.append(key, data[key]);
  }
  try {
    const res = await postRequest(PRODUCT_DETAIL_ORDER, formData)
    return res
  } catch (error) {

  }
}
export const ProductOrderConfirmApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("store_id", user.userRetailer.id)
  formData.append("apiToken", token + '')

  for (const key in data) {
    formData.append(key, data[key]);
  }
  try {
    const res = await postRequest(PRODUCT_CONFIRM_ORDER, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);

    return res
  } catch (error) {
    ErrorDialog(error);

  }
}
export const ProductOrderReadyApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("store_id", user.userRetailer.id)
  formData.append("apiToken", token + '')

  for (const key in data) {
    formData.append(key, data[key]);
  }
  try {
    const res = await postRequest(PRODUCT_READY_ORDER, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);

    return res
  } catch (error) {
    ErrorDialog(error);

  }
}
export const ProductOrderCancelApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')

  for (const key in data) {
    formData.append(key, data[key]);
  }
  try {
    const res = await postRequest(PRODUCT_CANCEL_ORDER, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);

    return res
  } catch (error) {
    ErrorDialog(error);

  }
}