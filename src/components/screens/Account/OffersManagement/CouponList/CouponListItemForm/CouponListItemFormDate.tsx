import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { ICoupon } from '../coupon-list.interface'

interface ICouponListItemFormDate {
  control: Control<ICoupon, any>
  register: any
  errors: any
}

const CouponListItemFormDate: FC<ICouponListItemFormDate> = ({ control, register, errors }) => {
  const t = useTranslations('Account.OffersManagement.CouponForm')

  return (
    <div className='mt-12 flex gap-x-[34px] gap-y-2 flex-col md:gap-y-7 md:flex-row md:text-lg'>
      <div>

        <Input
          rhf={{
            control,
            name: 'start_date',
            variant: 'underline',
            containerClass: 'md:w-[276px]',
            rules: { required: { value: true, message: "This Field is Required" } },
            label: {
              text: t('from-date'),
              className: 'md:!text-lg text-[#808080]'
            }
          }}
          type='date'
          placeholder='dd/mm/yyyy'
          {...register('start_date', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.start_date && (
          <div className='Invalid'>{errors?.start_date?.message}</div>
        )}
      </div>
      <div>
        <Input
          rhf={{
            control,
            name: 'end_date',
            variant: 'underline',
            containerClass: 'md:w-[276px]',
            rules: { required: { value: true, message: "This Field is Required" } },
            label: { text: t('to-date'), className: 'md:!text-lg text-[#808080]' }
          }}
          type='date'
          placeholder='dd/mm/yyyy'
          {...register('end_date', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.end_date && (
          <div className='Invalid'>{errors?.end_date?.message}</div>
        )}
      </div>
    </div>
  )
}

export default CouponListItemFormDate
