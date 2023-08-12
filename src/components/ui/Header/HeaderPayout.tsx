'use client'

import { useTranslations } from 'next-intl'

const HeaderPayout = () => {
  const t = useTranslations('Header')

  return (
    <div className='bg-white w-60 p-1 rounded-lg text-center xl:w-[262px] hidden min-[1130px]:block'>
      <div className='text-lg font-bold xl:text-xl'>{t('payout')}</div>
      <div className='mt-1 text-[#838383]'>0.000 OMR</div>
    </div>
  )
}

export default HeaderPayout
