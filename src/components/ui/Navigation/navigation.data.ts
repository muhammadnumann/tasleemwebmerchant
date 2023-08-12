import { INavigationItem } from './navigation.interface'

// default icons
import accountIcon from '@/public/images/d_account.svg'
import cartIcon from '@/public/images/d_cart.svg'
import dashboardIcon from '@/public/images/d_dashboard.svg'
import menuIcon from '@/public/images/d_menu.svg'

// active icons
import accountAIcon from '@/public/images/account.svg'
import cartAIcon from '@/public/images/cart.svg'
import dashboardAIcon from '@/public/images/dashboard.svg'
import menuAIcon from '@/public/images/menu.svg'

// All "text" properties here are keys for src/messages
export const navigationItems: INavigationItem[] = [
  {
    text: 'dashboard',
    defaultIcon: dashboardIcon,
    activeIcon: dashboardAIcon,
    url: '/dashboard'
  },
  {
    text: 'orders',
    defaultIcon: cartIcon,
    activeIcon: cartAIcon,
    url: '/orders'
  },
  {
    text: 'menu',
    defaultIcon: menuIcon,
    activeIcon: menuAIcon,
    url: '/menu'
  },
  {
    text: 'account',
    defaultIcon: accountIcon,
    activeIcon: accountAIcon,
    url: '/account'
  }
]
