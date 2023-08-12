'use client'

import { useTranslations } from 'next-intl'

const ThemeSwitcher = () => {
  const t = useTranslations('Account.Menu')

  return (
    <label className='inline-flex gap-2 items-center'>
      <div className='relative'>
        <input type='checkbox' value='' className='sr-only peer' disabled />
        <div className="w-[42px] h-3.5 cursor-pointer bg-gray-200 peer-focus:outline-none peer-disabled:cursor-default rounded-full peer dark:bg-[#9E9E9E] peer-checked:after:left-6 after:content-[''] after:absolute after:-top-0.5 after:-left-px after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </div>
      <span className='cursor-pointer peer-disabled:cursor-default text-sm font-medium text-gray-900 dark:text-[#888888]'>
        {t('dark-mode')}
      </span>
    </label>
  )
}

export default ThemeSwitcher
