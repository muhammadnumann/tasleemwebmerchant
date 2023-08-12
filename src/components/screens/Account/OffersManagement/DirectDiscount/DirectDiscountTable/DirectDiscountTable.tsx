import SaveButton from '@/components/ui/Buttons/SaveButton'
import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import { Control, FieldErrors, useFieldArray, useForm } from 'react-hook-form'
import { IDirectDiscountFormValues } from '../direct-discount.interface'
import DirectDiscountTableCategory from './DirectDiscountTableCategory'
import { DirectOfferApi, UpdateDirectOffer } from '@/redux/services/Coupon'
import Loader from '@/components/ui/Dailog/loader'

const DirectDiscountTable = ({ data }: any) => {

  const { control, register, handleSubmit, formState: { errors } } =
    useForm<IDirectDiscountFormValues>({
      mode: 'all',
      defaultValues: {
        discount_percentage: data?.discount_percentage,
        max_price: data?.max_price,
        categories: [
          { label: 'Desserts & Drinks', value: false },
          { label: 'Desserts & Drinks', value: false },
          { label: 'Desserts & Drinks', value: false },
          { label: 'Desserts & Drinks', value: false }
        ]
      }
    })

  const [loading, setLoading] = useState(false)
  const { fields, replace } = useFieldArray({ control, name: 'categories' })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const res = await UpdateDirectOffer(data);
      if (res.status == true)
        setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  })

  const selectAll = (isSelect: boolean) => {
    replace(fields.map((f) => ({ ...f, value: isSelect })))
  }

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
      className='w-full mt-2 border border-gray-default rounded-xl px-[22px] py-4'
    >
      {loading && <Loader />}
      <Inputs control={control} register={register} errors={errors} />
      <DirectDiscountTableCategory
        register={register}
        selectAll={selectAll}
        fields={fields}
      />
      <div className='flex justify-end mt-10'>
        <SaveButton className='!w-auto' />
      </div>
    </form>
  )
}

const Inputs: FC<{ control: Control<IDirectDiscountFormValues, any>, errors: FieldErrors<IDirectDiscountFormValues>, register: any }> = ({
  control,
  errors
}) => {
  const t = useTranslations('Account.OffersManagement')

  return (
    <div className='flex gap-2 justify-between flex-col sm:items-center sm:gap-8 md:gap-[51px] sm:flex-row'>
      <div>

        <Input
          rhf={{
            control,
            name: 'discount_percentage',
            variant: 'underline',
            rules: { required: { value: true, message: "This Feild is Required" } }
          }}
          placeholder={t('discount-percentage')}
          className='!px-0.5 text-xs'
        />
        {errors?.discount_percentage && (
          <div className='Invalid text-xs'>{errors?.discount_percentage?.message}</div>
        )}
      </div>
      <div>
        <Input
          rhf={{
            control,
            name: 'max_price',
            variant: 'underline',
            rules: { required: { value: true, message: "This Feild is Required" } }
          }}
          placeholder={t('max-price-for-discount')}
          className='!px-0.5 text-xs'
        />
        {errors?.max_price && (
          <div className='Invalid text-xs'>{errors?.max_price?.message}</div>
        )}
      </div>
    </div>
  )
}

export default DirectDiscountTable
