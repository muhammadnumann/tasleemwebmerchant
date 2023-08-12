'use client'

import cn from 'clsx'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { INavigationItem } from './navigation.interface'

const NavigationItem: FC<INavigationItem> = (props) => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')
  const isActive = pathname.slice(3).startsWith(props.url)

  return (
    <li>
      <Link
        href={props.url}
        className='flex flex-col gap-1 items-center sm:gap-2'
      >
        <Image
          src={isActive ? props.activeIcon : props.defaultIcon}
          alt='icon'
          className='w-6 h-6 sm:w-auto sm:h-auto'
        />
        <span
          className={cn(
            'text-[8px] font-semibold sm:text-xs',
            isActive ? 'text-blue-default' : 'text-black'
          )}
        >
          {t(props.text)}
        </span>
      </Link>
    </li>
  )
}

export default NavigationItem
