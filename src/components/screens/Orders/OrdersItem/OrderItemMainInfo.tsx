import { FC } from 'react'
import { IOrder } from '../orders.interface'
import moment from 'moment'
import { useLang } from '@/hooks/useLang'
interface value {
  name: string,
  count: number,
  date: any
}
const OrdersItemMainInfo: FC<value> = ({ name, count, date }) => {
  const { isEnglish } = useLang()

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-min sm:text-xl'>{isEnglish ? "Order #" : "طلب #"}{name}</div>
      <div className='text-min sm:text-lg text-[#5F5F5F]'>
        {isEnglish ? "Items" : "غرض"}: #{count}
      </div>
      <div className='text-min sm:text-lg text-[#5F5F5F]'>{moment(date).fromNow()}</div>
    </div>
  )
}

export default OrdersItemMainInfo
