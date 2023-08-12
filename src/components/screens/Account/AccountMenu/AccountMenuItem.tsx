import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FC } from 'react'
import { IAccountMenuItem } from './account-menu.interface'

const AccountMenuItem: FC<IAccountMenuItem> = ({ text, url, Icon }) => {
  const t = useTranslations('Account.Menu')

  return (
    <Link
      href={url}
      className='border border-[#C6C6C6] w-[70%] mx-auto rounded-md flex items-center h-12 px-5 gap-3.5 sm:w-3/5 sm:gap-5 sm:px-8 sm:h-16 md:w-1/2 md:h-[74px] md:gap-[26px] md:px-14'
    >
      <Icon className='text-lg sm:text-[28px]' />
      <span className='font-bold text-sm sm:text-xl'>{t(text)}</span>
    </Link>
  )
}

export default AccountMenuItem
