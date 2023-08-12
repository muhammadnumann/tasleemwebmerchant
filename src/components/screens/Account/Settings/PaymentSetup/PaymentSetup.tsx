import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import PaymentSetupItem from './PaymentSetupItem'
import { IPaymentSetupFormValues } from './payment-setup.interface'

interface IPaymentSetup {
  control: Control<IPaymentSetupFormValues, any>
}

const PaymentSetup: FC<IPaymentSetup> = ({ control }) => {
  const t = useTranslations('Account.Settings')

  return (
    <div>
      <div className='text-sm text-[#30CDFF] font-bold'>
        {t('payment-setup')}
      </div>
      <div className='mt-6 flex flex-col gap-6'>
        <PaymentSetupItem
          title={t('cash-payment-accepted')}
          control={control}
          name='is_cash_payment_enable'
        />
        <PaymentSetupItem
          title={t('online-payment-accepted')}
          control={control}
          name='is_digital_payment_enable'
        />
      </div>
    </div>
  )
}

export default PaymentSetup
