import { useLocale } from 'next-intl'

export const useLang = () => {
  const locale = useLocale()

  return {
    isEnglish: locale === 'en',
    isArabic: locale === 'ar'
  }
}
