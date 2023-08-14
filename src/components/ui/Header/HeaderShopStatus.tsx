/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useLang } from '@/hooks/useLang'
import { ChangeVendorStatus, CreateTaxes } from '@/redux/services/Account'
import { VendorStatus } from '@/redux/services/Vendor'
import cn from 'clsx'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useMemo, useState } from 'react'


const HeaderShopStatus = () => {
  const [status, setStatus] = useState('')
  const { isEnglish } = useLang()
  const t = useTranslations('Header.ShopStatus')

  const fetchData = async () => {
    try {
      const res = await VendorStatus()
      setStatus(res.data?.is_open_close)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const onStatusChange = async (data: any) => {

    try {
      ChangeVendorStatus({ status: data })
    } catch (error) {
    }
  }
  return (
    <div className=''>
      <div className='h-6 flex items-center gap-[46px] rounded-[15px] px-3 py-0.5 bg-[#A9A9A9] sm:h-[26px]'>
        <Item
          type='close'
          setStatus={setStatus}
          submit={onStatusChange}
          isActive={status === 'close'}
        />
        <Item type='busy'
          setStatus={setStatus}
          submit={onStatusChange}
          isActive={status === 'busy'} />
        <Item type='open'
          setStatus={setStatus}
          submit={onStatusChange}
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
  type: any
  isActive?: boolean
  setStatus: (s: any) => void
  submit?: any
}

const Item: FC<IItem> = ({
  type,
  isActive,
  setStatus,
  submit
}) => {
  return (
    <div
      onClick={() => {
        setStatus(type)
        submit(type)
      }}
      className={cn(
        'cursor-pointer min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px] rounded-full sm:min-w-[22px] sm:min-h-[22px] sm:max-w-[22px] sm:max-h-[22px]',
        {
          'bg-[#FF3131]': type === 'close',
          'bg-[#FFF509]': type === 'busy',
          'bg-[#4CEF00]': type === 'open'
        },
        isActive ? 'outline outline-[8px]' : '',
        isActive && {
          'outline-[#FF3131]/50': type === 'close',
          'outline-[#FFF509]/50': type === 'busy',
          'outline-[#4CEF00]/50': type === 'open'
        }
      )}
    ></div>
  )
}

export default HeaderShopStatus
