import cn from 'clsx'
import { FC } from 'react'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import HeaderFullScreen from './HeaderFullScreen'
import HeaderNotices from './HeaderNotices'
import HeaderPayout from './HeaderPayout'
import HeaderSearch from './HeaderSearch'
import HeaderShopStatus from './HeaderShopStatus'

interface IHeader {
  locale: string
}

const Header: FC<IHeader> = ({ locale }) => {
  const isEnglish = locale === 'en'

  return (
    <header className='flex items-start py-4 px-6 sm:items-center'>
      <div className='flex items-center gap-10 md:gap-12'>
        <HeaderShopStatus />
        <HeaderPayout />
      </div>
      <div
        className={cn(
          'flex gap-5',
          isEnglish ? 'ml-10 md:ml-14 xl:ml-24' : 'mr-10 md:mr-14 xl:mr-24'
        )}
      >
        <HeaderNotices />
        <HeaderFullScreen />
      </div>
      <div
        className={cn(
          'flex items-start gap-5 sm:items-center sm:gap-12',
          isEnglish ? 'ml-5 min-[1130px]:ml-auto' : 'mr-5 min-[1130px]:mr-auto'
        )}
      >
        <LanguageSwitcher />
        <HeaderSearch />
      </div>
    </header>
  )
}

export default Header
