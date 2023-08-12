import Input from '@/components/ui/Inputs/Input'
import Select from '@/components/ui/Select/Select'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import { useTranslations } from 'next-intl'
import { Dispatch, FC, SetStateAction } from 'react'
import { Control } from 'react-hook-form'
import {
  manualByClientOptions,
  percentageDiscountOptions
} from '../coupon-list.data'
import { ICoupon } from '../coupon-list.interface'

interface ICouponListItemFormDetails {
  control: Control<ICoupon, any>
  manualByClient: ISelectItem
  percentageDiscount: ISelectItem
  setManualByClient: Dispatch<SetStateAction<ISelectItem>>
  setPercentageDiscount: Dispatch<SetStateAction<ISelectItem>>
  register: any
  errors: any
}

const CouponListItemFormDetails: FC<ICouponListItemFormDetails> = (props) => {
  const { register, errors } = props
  const t = useTranslations('Account.OffersManagement.CouponForm')

  return (
    <div className='flex gap-x-[34px] gap-y-2 mt-4 flex-col md:gap-y-7 md:text-lg md:flex-row md:flex-wrap'>
      <div>

        <Input
          rhf={{
            control: props.control,
            name: 'coupon_code',
            variant: 'underline',
            containerClass: 'md:w-[270px]',
            rules: { required: { value: true, message: 'This Field is Required' } }
          }}
          className='text-center'
          placeholder={t('coupon-name')}
          {...register('coupon_code', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.coupon_code && (
          <div className='Invalid'>{errors?.coupon_code?.message}</div>
        )}
      </div>
      <Select
        options={manualByClientOptions}
        value={props.manualByClient}
        setValue={props.setManualByClient}
        variant='underline'
        containerClass='md:w-[270px]'
        labelClass='text-blue-default text-center'
      />
      <Select
        options={percentageDiscountOptions}
        value={props.percentageDiscount}
        setValue={props.setPercentageDiscount}
        variant='underline'
        containerClass='md:w-[270px]'
        labelClass='text-blue-default text-center'
      />
      <div>
        <Input
          rhf={{
            control: props.control,
            name: 'product_coupon_max_amount',
            variant: 'underline',
            containerClass: 'md:w-[270px]',
            rules: { required: { value: true, message: 'This Field is Required' } }
          }}
          className='text-center'
          placeholder={t('max-order-amount')}
          {...register('product_coupon_max_amount', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.product_coupon_max_amount && (
          <div className='Invalid'>{errors?.product_coupon_max_amount?.message}</div>
        )}
      </div>
      <div>

        <Input
          rhf={{
            control: props.control,
            name: 'percentage',
            variant: 'underline',
            containerClass: 'md:w-[270px]',
            rules: { required: { value: true, message: 'This Field is Required' } }
          }}
          className='text-center'
          placeholder={t('percentage')}
          {...register('percentage', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.percentage && (
          <div className='Invalid'>{errors?.percentage?.message}</div>
        )}
      </div>
      <div>
        <Input
          rhf={{
            control: props.control,
            name: 'use_limit',
            variant: 'underline',
            containerClass: 'md:w-[270px]',
            rules: { required: { value: true, message: 'This Field is Required' } }
          }}
          className='text-center'
          placeholder={t('number-of-uses')}
          {...register('use_limit', {
            required: { value: true, message: 'Field is Required' }
          })}
        />
        {errors?.use_limit && (
          <div className='Invalid'>{errors?.use_limit?.message}</div>
        )}
      </div>
    </div>
  )
}

export default CouponListItemFormDetails
