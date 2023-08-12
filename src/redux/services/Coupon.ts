import { ErrorDialog, SuccessDialog } from "@/components/ui/Dailog"
import { postRequest } from "."
import { getLocalStorage } from "../store/Auth/AuthActions"
import { ADD_COUPON, DIRECT_OFFER_DETAIL, GET_COUPONS, UPDATE_DIRECT_OFFER_DETAIL } from "./ApiConstants"

export const CouponsListingApi = async () => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  try {
    const res = await postRequest(GET_COUPONS, formData)
    if (res.status !== true) ErrorDialog(res.message)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const DirectOfferApi = async () => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  try {
    const res = await postRequest(DIRECT_OFFER_DETAIL, formData)
    if (res.status !== true) ErrorDialog(res.message)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const UpdateDirectOffer = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    if (key == 'discount_percentage' || key == 'max_price')
      formData.append(key, data[key])
  }
  try {
    const res = await postRequest(UPDATE_DIRECT_OFFER_DETAIL, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res.message)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}

export const AddCoupon = async (data: any, url: string) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    formData.append(key, data[key])
  }
  try {
    const res = await postRequest(url, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res.message)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}

