import { getLocalStorage } from '@/redux/store/Auth/AuthActions'
import { TypeTimeSetupWeek } from './time-setup.interface'


// All strings here are keys for src/messages
export const timeSetupWeek: TypeTimeSetupWeek[] = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
]
