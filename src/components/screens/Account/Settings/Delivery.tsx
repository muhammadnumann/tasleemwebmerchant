import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { IPaymentSetupFormValues } from './PaymentSetup/payment-setup.interface'

interface IDelivery {
  control: Control<IPaymentSetupFormValues, any>
  register: any
  errors: any
}

const Delivery: FC<IDelivery> = ({ control, register, errors }) => {
  const t = useTranslations('Account.Settings')

  return (
    <div>
      <div className='text-sm text-[#30CDFF] font-bold'>{t('delivery')}</div>
      <div>
        <Input
          rhf={{
            control,
            name: 'delivery_charge_pay_by_us',
            containerClass: 'mt-6 w-[200px]',
            label: { text: t('delivery-share') },
            rules: { required: { value: true, message: "Field is Required" } },
          }}
          {...register("minimum_cash_price", { required: { value: true, message: "Field is Required" } })}
          type='number'
          placeholder='0.000 OMR'

        />
        {errors?.minimum_cash_price && (
          <div className='Invalid'>{errors?.minimum_cash_price?.message}</div>
        )}
      </div>
    </div>
  )
}

export default Delivery
