'use client'

import cn from 'clsx'
import { useTranslations } from 'next-intl'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

interface ISaveButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const SaveButton: FC<ISaveButton> = (props) => {
  const t = useTranslations('UI')

  return (
    <button
      {...props}
      className={cn(
        props.className,
        'block w-[101px] text-blue-default font-bold sm:text-lg'
      )}
    >
      {t('save-button')}
    </button>
  )
}

export default SaveButton
