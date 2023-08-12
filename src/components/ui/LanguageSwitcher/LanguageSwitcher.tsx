'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LanguageSwitcher = () => {
  const pathname = usePathname()
  const locale = useLocale()

  const url = `/${locale === 'en' ? 'ar' : 'en'}${pathname.slice(3)}`

  return (
    <Link
      href={url}
      className='uppercase min-w-[24px] min-h-[24px] text-xs bg-[#B2D5F6] flex justify-center items-center font-bold shadow-icon rounded sm:rounded-lg sm:text-base sm:min-w-[48px] sm:min-h-[48px]'
    >
      {locale}
    </Link>
  )
}

export default LanguageSwitcher
