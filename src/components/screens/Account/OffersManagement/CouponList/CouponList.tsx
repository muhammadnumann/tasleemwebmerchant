import { useTranslations } from 'next-intl'
import { FC, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import CouponListItemForm from './CouponListItemForm/CouponListItemForm'
import { ICoupon, nullCoupun } from './coupon-list.interface'
import { CouponsListingApi } from '@/redux/services/Coupon'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Loader from '@/components/ui/Dailog/loader'
import MessageAlert from '@/components/ui/Message/Message'

const CouponList = () => {
  const t = useTranslations('Account.OffersManagement')
  const [isAdd, setIsAdd] = useState(false)
  const [loading, setloading] = useState(false)
  const [items, setItems] = useState<ICoupon[]>([])

  const isApiCalled = useSelector((state: any) => state?.ApiLoading?.isCalled)
  const fetchData = async () => {
    setloading(true)
    try {
      const res = await CouponsListingApi()
      setItems(res.data)
      setloading(false)
    } catch (error) {
      setloading(false)

    }
  }
  useEffect(() => {
    fetchData()
  }, [isApiCalled])
  return (
    <div className='mt-3'>
      <div className='text-lg font-bold text-center'>{t('coupon-list')}</div>
      <div className='mt-1 flex flex-col gap-2'>
        {loading && <Loader />}
        {items.map((i) => (
          <Item key={i.id} {...i} />
        ))}
        {items.length == 0 && <MessageAlert text='No Coupon data Found' />}
      </div>
      <div
        onClick={() => setIsAdd(true)}
        className='cursor-pointer flex justify-center items-center rounded-full mt-3.5 shadow-default bg-white mx-auto w-12 h-12'
      >
        <FaPlus size={24} />
      </div>
      {isAdd && <CouponListItemForm setIsOpen={setIsAdd} item={nullCoupun} isEdit={false} />}
    </div>
  )
}

const Item: FC<ICoupon> = (props) => {
  const [isDetails, setIsDetails] = useState(false)
  const t = useTranslations('Account.OffersManagement')

  return (
    <div className='flex items-center text-xs justify-between rounded border px-3.5 flex-col gap-y-2 py-1.5 border-gray-default md:flex-row'>
      <div>{props.coupon_code}</div>
      <div className='text-[#AE0000]'>{moment(new Date(props.end_date)).format("DD/MM/YYYY")}</div>
      <button
        className='text-blue-default'
        type='button'
        onClick={() => setIsDetails(true)}
      >
        {t('view-details')}
      </button>
      {isDetails && (
        <CouponListItemForm item={props} setIsOpen={setIsDetails} isEdit={true} />
      )}
    </div>
  )
}

// const testData: ICoupon[] = [
//   {
//     id: '1',
//     name: 'TASTCOUPONCODE1',
//     manualByClient: 'Amount Coupon',
//     percentageDiscount: 'Percentage Discount',
//     maxOrderAmount: '20',
//     numberOfUses: '2',
//     percentage: 'test 1',
//     fromDate: '23/06/2023',
//     toDate: '26/06/2023'
//   },
//   {
//     id: '2',
//     name: 'TASTCOUPONCODE2',
//     manualByClient: 'Manual by Client',
//     percentageDiscount: 'Amount Coupon',
//     maxOrderAmount: '3',
//     numberOfUses: '3',
//     percentage: 'test 2',
//     fromDate: '20/06/2023',
//     toDate: '21/06/2023'
//   },
//   {
//     id: '3',
//     name: 'TASTCOUPONCODE3',
//     manualByClient: 'Manual by Client',
//     percentageDiscount: 'Percentage Discount',
//     maxOrderAmount: '2',
//     numberOfUses: '1',
//     percentage: 'test 3',
//     fromDate: '01/05/2023',
//     toDate: '10/05/2023'
//   }
// ]

export default CouponList
