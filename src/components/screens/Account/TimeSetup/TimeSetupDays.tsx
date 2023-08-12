import Input from '@/components/ui/Inputs/Input'
import { useLang } from '@/hooks/useLang'
import cn from 'clsx'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control, FieldArrayWithId, FieldErrors } from 'react-hook-form'
import { FaArrowRightLong } from 'react-icons/fa6'
import { timeSetupWeek } from './time-setup.data'
import { ITimeSetupFormValues } from './time-setup.interface'

interface ITimeSetupDays {
  fields: FieldArrayWithId<ITimeSetupFormValues, 'days', 'id'>[]
  control: Control<ITimeSetupFormValues, any>
  errors: FieldErrors<ITimeSetupFormValues>
}

const TimeSetupDays: FC<ITimeSetupDays> = ({
  control,
  fields,
  errors: { days }
}) => {
  const t = useTranslations('Account.TimeSetup')
  const { isArabic } = useLang()

  return (
    <div className='flex flex-col gap-4'>
      {fields.map((f, i) => {
        return (
          <div key={f.id}>
            <div className='text-xs'>{t(timeSetupWeek[i])}</div>
            <div className='flex items-center flex-col gap-2 mt-1 sm:flex-row'>
              <Input
                rhf={{
                  control: control,
                  name: `days.${i}.from`,
                  containerClass:
                    'w-full sm:w-auto sm:min-w-[85px] sm:max-w-[145px]',
                  rules: {
                    required: true,
                    pattern: timePattern
                  }
                }}
                className='rounded-xl'
              />
              <FaArrowRightLong
                size={36}
                color='#30CDFF'
                className={cn(
                  'hidden sm:block',
                  isArabic ? 'rotate-180' : ''
                )}
              />
              <Input
                rhf={{
                  control: control,
                  name: `days.${i}.to`,
                  containerClass: 'w-full sm:w-auto sm:min-w-[85px]',
                  rules: {
                    required: true,
                    pattern: timePattern
                  }
                }}
                className='rounded-xl'
              />
            </div>
            {days &&
              (days[i]?.from?.type === 'pattern' ||
                days[i]?.to?.type === 'pattern') && (
                <div className='mt-2 text-sm text-red-500'>
                  {t('time-error')}
                </div>
              )}
          </div>
        )
      })}
    </div >
  )
}

// The message property here is key for src/messages
const timePattern = {
  value: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/,
  message: 'time-error'
}

export default TimeSetupDays
