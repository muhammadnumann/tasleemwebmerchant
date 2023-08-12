import Cookies from 'js-cookie'

export const setTokenCookie = (token: any) => {
  Cookies.set('token', token, { expires: 7 }) // expires in 7 days
}

export const getTokenCookie = () => {
  return Cookies.get('token')
}

export const removeTokenCookie = () => {
  Cookies.remove('token')
}

export const setUserCookies = (data: any) => {
  Cookies.set('userData', data, { expires: 7 }) // expires in 7 days
}

export const getUserCookie = () => {
  return Cookies.get('userData')
}

export const removeUserCookie = () => {
  Cookies.remove('userData')
}

export const getLocalStorage = (data: string) => {
  const res: any = localStorage.getItem(data)
  return JSON.parse(res)
}