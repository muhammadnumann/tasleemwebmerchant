'use client'

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher'
import { useLang } from '@/hooks/useLang'
import cn from 'clsx'
import AccountMenuItem from './AccountMenuItem'
import AccountMenuSignout from './AccountMenuSignout'
import { accountMenuItems } from './account-menu.data'
import { getLocalStorage } from '@/redux/store/Auth/AuthActions'

const AccountMenu = () => {
  const { isEnglish } = useLang()
  const data = getLocalStorage("userData").userRetailer

  return (
    <>
      <div
        className={cn(
          'w-[85%] flex items-center justify-between sm:w-4/5 md:w-3/4',
          isEnglish ? 'ml-auto' : 'mr-auto'
        )}
      >
        <div className='text-xl font-bold text-blue-default max-w-[64%] overflow-hidden whitespace-nowrap text-ellipsis md:text-2xl'>
          {isEnglish ? data.company_name : data.company_name_arab}
        </div>
        <AccountMenuSignout />
      </div>
      <ul className='mt-8 flex flex-col gap-4'>
        {accountMenuItems.map((i) => (
          <AccountMenuItem key={i.url} {...i} />
        ))}
      </ul>
      <div className='flex justify-end mt-6 '>
        <ThemeSwitcher />
      </div>
    </>
  )
}

export default AccountMenu
