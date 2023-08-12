import { IAccountMenuItem } from './account-menu.interface'

import { AiOutlineClockCircle, AiOutlinePrinter } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { HiOutlineTicket } from 'react-icons/hi'
import { IoFileTrayFullSharp } from 'react-icons/io5'

// All "text" properties here are keys for src/messages
export const accountMenuItems: IAccountMenuItem[] = [
  {
    text: 'manage-profile',
    Icon: BiUser,
    url: '/account/manage-profile'
  },
  {
    text: 'offers-management',
    Icon: HiOutlineTicket,
    url: '/account/offers-management'
  },
  {
    text: 'taxes',
    Icon: IoFileTrayFullSharp,
    url: '/account/taxes'
  },
  {
    text: 'time-setup',
    Icon: AiOutlineClockCircle,
    url: '/account/time-setup'
  },
  {
    text: 'printers',
    Icon: AiOutlinePrinter,
    url: '/account/printers'
  },
  {
    text: 'settings',
    Icon: FiSettings,
    url: '/account/settings'
  }
]
