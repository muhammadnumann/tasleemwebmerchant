'use client'

import { useTranslations } from 'next-intl'

const LoginFooterText = () => {
  const t = useTranslations('Login')

  return (
    <div className='text-[#7B7878] text-xs mt-auto'>{t('footer-text')}</div>
  )
}

export default LoginFooterText
