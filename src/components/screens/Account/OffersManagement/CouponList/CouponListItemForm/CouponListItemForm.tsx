import CancelButton from '@/components/ui/Buttons/CancelButton'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import { useOutside } from '@/hooks/useOutside'
import { useTranslations } from 'next-intl'
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { useForm } from 'react-hook-form'
import {
  manualByClientOptions,
  percentageDiscountOptions
} from '../coupon-list.data'
import { ICoupon } from '../coupon-list.interface'
import CouponListItemFormDate from './CouponListItemFormDate'
import CouponListItemFormDetails from './CouponListItemFormDetails'
import moment from 'moment'
import { AddCoupon } from '@/redux/services/Coupon'
import { ADD_COUPON, EDIT_COUPON } from '@/redux/services/ApiConstants'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'

interface ICouponListItemForm {
  item: ICoupon
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isEdit: boolean
}

const CouponListItemForm: FC<ICouponListItemForm> = (props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <div className='fixed w-full h-full z-[100] p-5 left-0 top-0 bg-black/20 flex justify-center items-center'>
      <Form {...props} />
    </div>
  )
}

const Form: FC<ICouponListItemForm> = (props) => {
  const { item } = props
  const ref = useRef<HTMLFormElement>(null)
  useOutside(ref, () => props.setIsOpen(false))

  const t = useTranslations('Account.OffersManagement')
  const [manualByClient, setManualByClient] = useState(
    manualByClientOptions.find((i) => i.value == item?.apply_type) ??
    manualByClientOptions[0]
  )
  const [percentageDiscount, setPercentageDiscount] = useState(
    percentageDiscountOptions.find(
      (i) => i.value === item?.product_coupon_type
    ) ?? percentageDiscountOptions[0]
  )
  const { control, handleSubmit, register, formState: { errors } } = useForm<ICoupon>({
    mode: 'all',
    defaultValues: {
      apply_type: item.apply_type,
      coupon_code: item.coupon_code,
      end_date: item.end_date,
      percentage: item.percentage,
      product_coupon_discount: item.product_coupon_discount,
      product_coupon_max_amount: item.product_coupon_max_amount,
      product_coupon_type: item.product_coupon_type,
      start_date: item.start_date,
      use_limit: item.use_limit
    }
  })

  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    data = { ...data, apply_type: manualByClient.value, product_coupon_type: percentageDiscount.value }
    let url = ''
    if (props.isEdit) {

      url = EDIT_COUPON
      data = { ...data, id: item.id }
    }
    else
      url = ADD_COUPON

    try {
      const res = await AddCoupon(data, url)
      if (res.status == true)
        dispatch(ApiCalled())

    } catch (error) {

    }
  })

  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      noValidate
      autoComplete='off'
      className='w-[645px] overflow-h idden bg-white rounded-3xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'
    >
      <div className='max-h-[500px] overflow-y-auto p-7'>
        <div className='text-2xl font-bold'>{t('add-coupon')}</div>
        <CouponListItemFormDetails
          control={control}
          manualByClient={manualByClient}
          percentageDiscount={percentageDiscount}
          setManualByClient={setManualByClient}
          setPercentageDiscount={setPercentageDiscount}
          register={register}
          errors={errors}
        />
        <CouponListItemFormDate control={control} register={register} errors={errors} />
        <div className='flex justify-between items-center mt-20'>
          <CancelButton
            onClick={() => props.setIsOpen(false)}
            className='text-lg'
          />
          <SaveButton className='!w-auto !text-2xl' />
        </div>
      </div>
    </form>
  )
}

export default CouponListItemForm
