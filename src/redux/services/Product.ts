import { ErrorDialog, SuccessDialog } from '@/components/ui/Dailog'
import { postRequest } from '.'
import { getLocalStorage } from '../store/Auth/AuthActions'
import {
  ADD_PRODUCT_SUBCATEGORY,
  CHANGE_PRODUCT_STATUS,
  CREATE_PRODUCT,
  DELETE_PRODUCT_TAX,
  EDIT_PRODUCT_SUBCATEGORY,
  PRODUCT_CATEGORY,
  PRODUCT_LIST,
  PRODUCT_SUBCATEGORY,
  UPLOAD_PRODUCT_IMAGE,
  ADD_ADDONS,
  ADD_PARAMETERS,
  PRODUCT_DETAIL,
  CHANGE_SUBCATEGORY_STATUS,
  DELETE_SUBCATEGORY
} from './ApiConstants'

export const ProductListingApi = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  for (const key in data) {
    formData.append(key, data[key])
  }

  try {
    const res = await postRequest(PRODUCT_LIST, formData)
    if (res.status !== true) ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const DeleteSubCategoryAPi = async (data: any) => {
  const formData = new FormData()
  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')
  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    formData.append(key, data[key])
  }

  try {
    const res = await postRequest(DELETE_SUBCATEGORY, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const ChangeSubCategoryStatus = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  for (const key in data) {
    formData.append(key, data[key])
  }

  try {
    const res = await postRequest(CHANGE_SUBCATEGORY_STATUS, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const ChangeProductStatus = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  for (const key in data) {
    formData.append(key, data[key])
  }

  try {
    const res = await postRequest(CHANGE_PRODUCT_STATUS, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const CreateProduct = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  const images = data?.image
  let addons = data?.addon
  let Parameter = data?.Parameter

  delete data?.image
  delete data?.addon

  let i
  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    if (key === 'currency')
      formData.append(key, data[key] === null ? '' : data[key])
    else if (key == 'image') formData.append('image', data.image[0])
    else if (key == 'Parameter') i = 0
    else formData.append(key, data[key])
  }

  try {
    const res = await postRequest(CREATE_PRODUCT, formData)

    if (res?.data?.product?.id && images) {
      await UploadProductImage(
        { images, product_id: res?.data?.product?.id },
        false
      )
    }

    if (res?.data?.product?.id && Parameter?.length) {
      Parameter = Parameter.map((item: any) => {
        return {
          ...item,
          product_id: res?.data?.product?.id
        }
      })

      await addProductParameter(Parameter, false)
    }
    if (res?.data?.product?.id && addons?.length) {
      addons = addons.map((item: any) => {
        return {
          ...item,
          product_id: res?.data?.product?.id
        }
      })

      await addProductAddon(addons, false)
    }

    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const UploadProductImage = async (data: any, isPop = true) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  formData.append('product_id', data?.product_id)

  for (const img of data?.images) {
    formData.append('images', img)
  }

  try {
    const res = await postRequest(UPLOAD_PRODUCT_IMAGE, formData)
    if (isPop) {
      if (res.status === true) SuccessDialog(res.message)
      else ErrorDialog(res)
    }
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const addProductAddon = async (data: any, isPop = true) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  for (let i = 0; i < data?.length; i++) {
    formData.append(`addon[${i}][product_id]`, data[i]?.product_id)
    formData.append(`addon[${i}][description]`, data[i]?.description)
    formData.append(`addon[${i}][description_arab]`, data[i]?.description_arab)
    formData.append(`addon[${i}][price]`, data[i]?.price)
    formData.append(`addon[${i}][title]`, data[i]?.title)
    formData.append(`addon[${i}][title_arab]`, data[i]?.title_arab)
  }

  try {
    const res = await postRequest(ADD_ADDONS, formData)
    if (isPop) {
      if (res.status === true) SuccessDialog(res.message)
      else ErrorDialog(res)
    }
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const addProductParameter = async (data: any, isPop = true) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  for (let i = 0; i < data?.length; i++) {
    formData.append(`Parameter[product_id]`, data[i]?.product_id)
    formData.append(`Parameter[title]`, data[i]?.title)
    formData.append(`Parameter[title_arab]`, data[i]?.title_arab)
    data[i]?.ParameterOptions?.forEach((val: any, index: number) => {
      formData.append(`ParameterOptions[${index}][price]`, val?.price)
      formData.append(`ParameterOptions[${index}][title]`, val?.title)
      formData.append(`ParameterOptions[${index}][title_arab]`, val?.title_arab)
    });

  }

  try {
    const res = await postRequest(ADD_PARAMETERS, formData)
    if (isPop) {
      if (res.status === true) SuccessDialog(res.message)
      else ErrorDialog(res)
    }
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const DuplicateProduct = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    if (
      key === 'category' ||
      key === 'image_path' ||
      key === 'category_arab' ||
      key === 'subcategory' ||
      key === 'subcategory_arab' ||
      key === 'Images' ||
      key === 'id'
    ) { }
    else if (key === 'currency')
      formData.append(key, data[key] === null ? '' : data[key])
    else formData.append(key, data[key])
  }
  try {
    const res = await postRequest(CREATE_PRODUCT, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
export const ProductCategory = async () => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  try {
    const res = await postRequest(PRODUCT_CATEGORY, formData)
    return res
  } catch (error) { }
}
export const ProductDetailById = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  formData.append('id', data.id)


  try {
    const res = await postRequest(PRODUCT_DETAIL, formData)
    return res
  } catch (error) { }
}
export const ProductSubCategory = async () => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  try {
    const res = await postRequest(PRODUCT_SUBCATEGORY, formData)
    return res
  } catch (error) { }
}
export const DeleteProductTaxes = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    formData.append(key, data[key])
  }

  try {
    const res = await postRequest(DELETE_PRODUCT_TAX, formData)
    return res
  } catch (error) { }
}
export const AddProductSubCategory = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    if (key != 'image') formData.append(key, data[key])
    else formData.append('image', data.image[0])
  }
  try {
    const res = await postRequest(ADD_PRODUCT_SUBCATEGORY, formData)
    return res
  } catch (error) { }
}
export const EditProductSubCategory = async (data: any) => {
  const formData = new FormData()

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')
  for (const key in data) {
    if (key != 'image') formData.append(key, data[key])
    else {
      if (data.image !== null) formData.append('image', data.image[0])
    }
  }
  try {
    const res = await postRequest(EDIT_PRODUCT_SUBCATEGORY, formData)
    return res
  } catch (error) { }
}
