import { WeekFormat } from '@/components/screens/Account/TimeSetup/time-setup.interface';
import { ErrorDialog, SuccessDialog } from "@/components/ui/Dailog"
import { postRequest } from "."
import { ACCOUNT_SETTING, ADD_PRODUCT_TAX_LIST, CREATE_TAXES, DELETE_PRODUCT_TAX_LIST, EDIT_PROFILE, EDIT_TAXES, IS_AUTHORIZED_API, PRODUCT_TAX_LIST, SETTING_API, UPDATE_TIME_SETUP } from "./ApiConstants"
import { getLocalStorage } from "../store/Auth/AuthActions"
import { UploadProductImage } from './Product';

export const AccountSetting = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  formData.append('vendor_id', user.userRetailer.id)
  for (const key in data) {
    formData.append(key, data[key]);
  }
  try {
    const response = await postRequest(ACCOUNT_SETTING, formData)
    if (response.status === true) {
      SuccessDialog(response.message)
    } else
      ErrorDialog(response.message);

    return response
  } catch (error) {
    ErrorDialog(error);
  }
}

export const EditManageProfile = async (data: any) => {
  const formData = new FormData()
  const user = getLocalStorage("userData")
  formData.append('id', user.userRetailer.id)
  for (const key in data) {
    if (key == 'image_path' || key == 'feature_banner_path' || key == 'banner_image_path')
      formData.append(key, data[key][0]);
    else
      formData.append(key, data[key]);
  }
  const images = data?.image

  try {
    const res = await postRequest(EDIT_PROFILE, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);
    return res
  } catch (error) {
    ErrorDialog(error);
  }
}
export const UpdateTimeSetup = async (data: any) => {
  const formData = new FormData()
  const user = getLocalStorage("userData")
  formData.append('id', user.userRetailer.id)
  formData.append('store_timezone', data.store_timezone)

  for (let i = 0; i < data.days.length; i++) {
    formData.append(WeekFormat[i][0], data.days[i].from);
    formData.append(WeekFormat[i][1], data.days[i].to);
  }
  try {
    const res = await postRequest(UPDATE_TIME_SETUP, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);
    return res
  } catch (error) {
    ErrorDialog(error);
  }
}

export const CreateTaxes = async (data: any) => {
  const formData = new FormData()
  const editFormData = new FormData()

  const user = getLocalStorage("userData")
  formData.append('vendor_id', user.userRetailer.id)
  editFormData.append('vendor_id', user.userRetailer.id)

  let i = 0
  data.forEach((tax: any, index: any) => {
    if (tax.id < 0) {
      for (let key in tax) {
        if (key === 'tid' || key === 'id') {
        } else
          formData.append(`${key}`, tax[key]);
      }
      i++
    } else {
      for (let key in tax) {
        if (key === 'tid') {
          editFormData.append(`id`, tax[key]);
        } else
          editFormData.append(`${key}`, tax[key]);
      }
    }
  });
  try {
    const res = await postRequest(CREATE_TAXES, formData)
    const res2 = await postRequest(EDIT_TAXES, editFormData)
    if (res2.status === true) {
      SuccessDialog(res2.message)
    } else
      ErrorDialog(res2.message);
    return res2
  } catch (error) {
    ErrorDialog(error);
  }
}


export const ProductTaxListingApi = async () => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')

  try {
    const res = await postRequest(PRODUCT_TAX_LIST, formData)
    return res
  } catch (error) {

  }
}

export const DeleteTaxApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  formData.append("id", data.tid)

  try {

    const res = await postRequest(DELETE_PRODUCT_TAX_LIST, formData)
    if (res.status === true) {
      SuccessDialog(res.message)
    } else
      ErrorDialog(res.message);

    return res
  } catch (error) {
    ErrorDialog(error);

  }
}

export const EditProductTaxListingApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  for (const key in data) {
    formData.append(key, data[key]);
  }
  // const apiData = {
  //   id: data.id,
  //   is_default: data.is_default ? 1 : 0,
  //   title: data.title,
  //   value: data.value,
  //   vendor_id: data.vendor_id,
  // }
  try {

    const res = await postRequest(ADD_PRODUCT_TAX_LIST, formData)
    return res
  } catch (error) {

  }
}

export const SettingDataApi = async () => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  // for (const key in data) {
  //   formData.append(key, data[key]);
  // }

  try {
    const res = await postRequest(SETTING_API, formData)
    return res
  } catch (error) {

  }
}
export const IsAuthorizedApi = async () => {
  const formData = new FormData()

  const user = getLocalStorage("userData")
  const token = localStorage.getItem("token")

  if (!token) {

    console.log('Numan')
    return { status: 'false' }
  }
  formData.append("vendor_id", user.userRetailer.id)
  formData.append("apiToken", token + '')
  // for (const key in data) {
  //   formData.append(key, data[key]);
  // }

  try {
    const res = await postRequest(IS_AUTHORIZED_API, formData)
    return res
  } catch (error) {

  }
}





