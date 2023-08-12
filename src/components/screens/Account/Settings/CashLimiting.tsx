import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control, RegisterOptions } from 'react-hook-form'
import { IPaymentSetupFormValues } from './PaymentSetup/payment-setup.interface'

interface ICashLimiting {
  control: Control<IPaymentSetupFormValues, any>
  register: any
  errors: any
}

const CashLimiting: FC<ICashLimiting> = ({ control, register, errors }) => {
  const t = useTranslations('Account.Settings')

  return (
    <div className=''>
      <div className='text-sm text-[#30CDFF] font-bold'>
        {t('cash-limiting')}
      </div>
      <div className='mt-6 flex flex-col gap-8 w-[200px] md:w-full md:items-start md:flex-row'>
        <div>

          <Input
            rhf={{
              control,
              name: 'minimum_cash_price',
              label: { text: t('minimum-cash-to-order') },
              rules: { required: { value: true, message: "Field is Required" } },
            }}
            {...register("minimum_cash_price", { required: { value: true, message: "Field is Required" } })}
            type='number'

          />
          {errors?.minimum_cash_price && (
            <div className='Invalid'>{errors?.minimum_cash_price?.message}</div>
          )}
        </div>
        <div>
          <Input
            rhf={{
              control,
              name: 'maximum_cash_price',
              label: { text: t('maximum-cash-to-order') },
              rules: { required: { value: true, message: "Field is Required" } },
            }}
            {...register("maximum_cash_price", { required: { value: true, message: "Field is Required" } })}
            type='number'
          />
          {errors?.maximum_cash_price && (
            <div className='Invalid'>{errors?.maximum_cash_price?.message}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CashLimiting
