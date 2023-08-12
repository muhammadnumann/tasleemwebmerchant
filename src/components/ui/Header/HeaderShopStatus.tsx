'use client'

import { useLang } from '@/hooks/useLang'
import { VendorStatus } from '@/redux/services/Vendor'
import cn from 'clsx'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'

type TypeStatus = 'closed' | 'busy' | 'open'

const HeaderShopStatus = () => {
  const [status, setStatus] = useState<TypeStatus>('closed')
  const { isEnglish } = useLang()
  const t = useTranslations('Header.ShopStatus')

  const fetchData = async () => {
    try {
      const res = await VendorStatus()
      if (res.data.is_busy) {
        setStatus("busy")
      } else
        setStatus(res.data?.is_open_close)
    } catch (error) {
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className=''>
      <div className='h-6 flex items-center gap-[46px] rounded-[15px] px-3 py-0.5 bg-[#A9A9A9] sm:h-[26px]'>
        <Item
          type='closed'
          // setStatus={setStatus}
          isActive={status === 'closed'}
        />
        <Item type='busy'
          // setStatus={setStatus}
          isActive={status === 'busy'} />
        <Item type='open'
          // setStatus={setStatus}
          isActive={status === 'open'} />
      </div>
      <div
        className={cn(
          'flex text-min font-semibold mt-1 sm:mt-2 sm:text-sm',
          isEnglish ? 'gap-7.5' : 'gap-[46px]'
        )}
      >
        <span>{t('closed')}</span>
        <span>{t('busy')}</span>
        <span>{t('open')}</span>
      </div>
    </div>
  )
}

interface IItem {
  type: TypeStatus
  isActive?: boolean
  // setStatus: (s: TypeStatus) => void
}

const Item: FC<IItem> = ({
  type,
  isActive,
  // setStatus
}) => {
  return (
    <div
      onClick={() => {
        // setStatus(type)
      }}
      className={cn(
        'cursor-pointer min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px] rounded-full sm:min-w-[22px] sm:min-h-[22px] sm:max-w-[22px] sm:max-h-[22px]',
        {
          'bg-[#FF3131]': type === 'closed',
          'bg-[#FFF509]': type === 'busy',
          'bg-[#4CEF00]': type === 'open'
        },
        isActive ? 'outline outline-[8px]' : '',
        isActive && {
          'outline-[#FF3131]/50': type === 'closed',
          'outline-[#FFF509]/50': type === 'busy',
          'outline-[#4CEF00]/50': type === 'open'
        }
      )}
    ></div>
  )
}

export default HeaderShopStatus
