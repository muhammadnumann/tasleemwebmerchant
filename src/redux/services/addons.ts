import { ErrorDialog, SuccessDialog } from '@/components/ui/Dailog'
import { postRequest } from '.'
import { getLocalStorage } from '../store/Auth/AuthActions'
import { DELETE_PRODUCT, UPDATE_PRODUCT } from './ApiConstants'
import { UploadProductImage, addProductAddon, addProductParameter } from './Product'
import { IParameter } from '@/components/screens/Menu/IProductAdd.interface'

export const EditProductHandler = async (data: any) => {
  const formData = new FormData()
  const AddonFormData = new FormData()
  const images = data?.image
  delete data?.image

  if (data?.image?.length == 0) {
    delete data?.image
  }

  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user.userRetailer.id)
  formData.append('apiToken', token + '')

  AddonFormData.append('vendor_id', user.userRetailer.id)
  AddonFormData.append('apiToken', token + '')

  let addons = []
  let Parameter = []

  for (const key in data) {
    if (key == 'Parameter') {
      for (let i = 0; i < data.Parameter?.length; i++) {
        if (data.Parameter[i].isNew == 1) {
          Parameter.push(data.Parameter[i])
        } else {
          formData.append(`Parameter[${i}][id]`, data.Parameter[i]?.id)
          formData.append(`Parameter[${i}][title]`, data.Parameter[i]?.title)
          formData.append(
            `Parameter[${i}][title_arab]`,
            data.Parameter[i]?.title_arab
          )
          data.Parameter[i]?.ParameterOptions?.forEach(
            (val: any, index: number) => {
              formData.append(`ParameterOptions[${index}][price]`, val?.price)
              formData.append(`ParameterOptions[${index}][title]`, val?.title)
              formData.append(
                `ParameterOptions[${index}][title_arab]`,
                val?.title_arab
              )
            }
          )
        }
      }
    } else if (key == 'addon') {
      for (let i = 0; i < data.addon?.length; i++) {
        if (data.addon[i].isNew == 1) {
          addons.push(data.addon[i])
        } else {
          formData.append(`addon[${i}][id]`, data.addon[i]?.id)
          formData.append(`addon[${i}][description]`, data.addon[i]?.description)
          formData.append(`addon[${i}][description_arab]`, data.addon[i]?.description_arab)
          formData.append(`addon[${i}][price]`, data.addon[i]?.price)
          formData.append(`addon[${i}][title]`, data.addon[i]?.title)
          formData.append(`addon[${i}][title_arab]`, data.addon[i]?.title_arab)
        }
      }
    } else {
      if (key == 'id') {
        formData.append(key, data[key])

      } else formData.append(`Product[${key}]`, data[key])
    }
  }
  if (data?.id && Parameter?.length) {
    Parameter = Parameter.map((item: any) => {
      return {
        ...item,
        product_id: data?.id
      }
    })
    await addProductParameter(Parameter, false)
  }
  if (data?.id && addons?.length) {
    addons = addons.map((item: any) => {
      return {
        ...item,
        product_id: data?.id
      }
    })
    await addProductAddon(addons, false)
  }
  try {
    if (images.length)
      await UploadProductImage(
        { images, product_id: data?.id },
        false
      )
    debugger
    const res = await postRequest(UPDATE_PRODUCT, formData)
    if (res.status === true) SuccessDialog(res.message)
    else ErrorDialog(res.message)
    return res
  } catch (error) {
    ErrorDialog(error)


  }
}


export const DeleteProductHandler = async (data: any) => {
  const formData = new FormData()
  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user?.userRetailer?.id)
  formData.append('apiToken', token + '')
  formData.append('id', data?.id)

  try {
    const res = await postRequest(DELETE_PRODUCT, formData)
    if (res.status) {
      SuccessDialog(res.message)
    }

    return res
  } catch (error) { }
}
