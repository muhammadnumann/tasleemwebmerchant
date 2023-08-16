import { ErrorDialog } from '@/components/ui/Dailog'
import { postRequest } from '.'
import { getLocalStorage } from '../store/Auth/AuthActions'
import { DASHBOARD_API, REVIEWS_API } from './ApiConstants'


export const DashbpardApiHandler = async () => {
  const formData = new FormData()
  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user?.userRetailer?.id)
  formData.append('apiToken', token + '')

  try {
    const res = await postRequest(DASHBOARD_API, formData)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}

export const ReviewsApiHandler = async () => {
  const formData = new FormData()
  const user = getLocalStorage('userData')
  const token = localStorage.getItem('token')

  formData.append('vendor_id', user?.userRetailer?.id)
  formData.append('apiToken', token + '')

  try {
    const res = await postRequest(REVIEWS_API, formData)
    return res
  } catch (error) {
    ErrorDialog(error)
  }
}
