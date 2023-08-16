'use client'

import searchIcon from '@/public/images/search_icn.svg'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const HeaderSearch = () => {
  const t = useTranslations('Header')
  const [text, setText] = useState('')

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className='relative w-full min-[820px]:w-[300px] xl:w-[373px]' ref={inputRef}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='bg-white rounded-md shadow-default h-6 w-full text-sm pr-2 pl-9 sm:text-base sm:pl-[60px] sm:h-[58px]'
        placeholder={t('placeholder')}
      />
      <Image
        src={searchIcon}
        alt='search'
        className='absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:left-5 sm:w-5 sm:h-[22px]'
      />
    </div>
  )
}

export default HeaderSearch
