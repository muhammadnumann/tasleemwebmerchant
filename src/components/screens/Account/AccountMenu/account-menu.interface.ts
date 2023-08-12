import { IconType } from 'react-icons'

export interface IAccountMenuItem {
  text:
    | 'manage-profile'
    | 'offers-management'
    | 'taxes'
    | 'time-setup'
    | 'printers'
    | 'settings'
  url: string
  Icon: IconType
}
