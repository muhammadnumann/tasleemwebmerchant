import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import { IPaymentSetupFormValues } from './payment-setup.interface'

interface IPaymentSetupItem {
  title: string
  name: Path<IPaymentSetupFormValues>
  control: Control<IPaymentSetupFormValues, any>
}

const PaymentSetupItem: FC<IPaymentSetupItem> = (props) => {
  const t = useTranslations('Account.Settings')

  return (
    <div className='flex items-center gap-3 text-sm'>
      <span>{props.title}</span>
      <Radio {...props} text={t('yes')} index={1} correctedValue={true} />
      <Radio {...props} text={t('no')} index={2} correctedValue={false} />
    </div>
  )
}

interface IRadio extends Omit<IPaymentSetupItem, 'title'> {
  text: string
  index: number
  correctedValue: boolean
}

const Radio: FC<IRadio> = (props) => {
  return (
    <label
      htmlFor={props.name + props.index}
      className='flex cursor-pointer items-center gap-1'
    >
      <Controller
        control={props.control}
        name={props.name}
        render={({ field: { onBlur, onChange, value, ref } }) => (
          <input
            id={props.name + props.index}
            type='radio'
            className='sr-only peer'
            onBlur={onBlur}
            onChange={() => onChange(props.correctedValue)}
            checked={value === props.correctedValue}
            ref={ref}
          />
        )}
      />
      <span className='peer relative w-6 h-6 rounded-full border border-[#D9D9D9] peer-checked:after:content-[""] after:hidden peer-checked:after:block after:w-5 after:h-5 after:bg-[#30CDFF] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' />
      <span>{props.text}</span>
    </label>
  )
}

export default PaymentSetupItem
