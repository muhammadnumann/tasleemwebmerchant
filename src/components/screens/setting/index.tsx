'use client'

import { accountMenuItems } from '@/components/screens/Account/AccountMenu/account-menu.data'
import AccountTabTitle from '@/components/screens/Account/AccountTabTitle'
import CashLimiting from '@/components/screens/Account/Settings/CashLimiting'
import Delivery from '@/components/screens/Account/Settings/Delivery'
import PaymentSetup from '@/components/screens/Account/Settings/PaymentSetup/PaymentSetup'
import PaymentSetupItem from '@/components/screens/Account/Settings/PaymentSetup/PaymentSetupItem'
import { IPaymentSetupFormValues } from '@/components/screens/Account/Settings/PaymentSetup/payment-setup.interface'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import Loader from '@/components/ui/Dailog/loader'
import { AccountSetting } from '@/redux/services/Account'
import { SettingsSlice } from '@/redux/store/Account/AccountReducer'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'



const SettingsPage = ({ data }: any) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<IPaymentSetupFormValues>({
    mode: 'all',
    defaultValues: {
      is_cash_payment_enable: data?.is_cash_payment_enable == 'true',
      is_digital_payment_enable: data?.is_digital_payment_enable == 'true',
      use_our_drivers: data?.use_our_drivers == 'true',
      minimum_cash_price: data?.minimum_cash_price,
      maximum_cash_price: data?.maximum_cash_price,
      delivery_charge_pay_by_us: data?.delivery_charge_pay_by_us,

    }
  })
  const [loading, setLoading] = useState(false)
  const t = useTranslations('Account.Settings')
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const res = await AccountSetting(data)
    if (res.status === true) {
      setLoading(false)
      dispatch(SettingsSlice(res))
    } else setLoading(false)
  })

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      autoComplete='off'
      className='w-[70%] mx-auto md:w-3/5'
    >
      {loading && <Loader />}
      <AccountTabTitle {...accountMenuItems[5]} />
      <div className='mt-8 flex flex-col gap-6'>
        <PaymentSetup control={control} />
        <CashLimiting control={control} register={register} errors={errors} />
        <Delivery control={control} register={register} errors={errors} />
        <PaymentSetupItem
          title={t('use_our_driver')}
          control={control}
          name='use_our_drivers'
        />
      </div>
      <SaveButton className='mx-auto mt-[140px]' type='submit' />
    </form>
  )
}

export default SettingsPage
