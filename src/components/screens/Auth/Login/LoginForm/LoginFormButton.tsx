import { useTranslations } from 'next-intl'

const LoginFormButton = () => {
  const t = useTranslations('Login')

  return (
    <div className='mt-8 flex justify-center'>
      <button
        type='submit'
        className='h-12 w-[230px] text-white shadow-default bg-blue-default hover:bg-blue-default/95 duration-300 rounded-[34px] font-bold text-lg sm:h-14 sm:w-[309px] md:text-[23px] md:h-[65px]'
      >
        {t('button')}
      </button>
    </div>
  )
}

export default LoginFormButton
