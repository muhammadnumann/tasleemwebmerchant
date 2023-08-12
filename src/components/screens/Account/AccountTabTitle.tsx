import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { IAccountMenuItem } from './AccountMenu/account-menu.interface'

const AccountTabTitle: FC<IAccountMenuItem> = ({ text, Icon }) => {
  const t = useTranslations('Account.Menu')

  return (
    <div className='flex justify-center items-center gap-3 text-blue-default'>
      <Icon className='w-8 h-8' />
      <div className='text-xl font-bold md:text-2xl'>{t(text)}</div>
    </div>
  )
}

export default AccountTabTitle
