'use client'

import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

interface ICancelButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const CancelButton: FC<ICancelButton> = (props) => {
  const t = useTranslations('UI')

  return (
    <button
      {...props}
      type='button'
      className='text-[#FF2E00] font-bold text-lg'
    >
      {t('cancel-button')}
    </button>
  )
}

export default CancelButton
