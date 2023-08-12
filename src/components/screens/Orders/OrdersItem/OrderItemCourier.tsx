import { useLang } from '@/hooks/useLang'
import cn from 'clsx'
import moment from 'moment'
import { FC } from 'react'
import { GiCycling } from 'react-icons/gi'

interface IOrderItemCourier {
  name: string
  startDate: string
}

const OrderItemCourier: FC<IOrderItemCourier> = (props) => {
  const { isEnglish } = useLang()

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        isEnglish ? 'ml-[5%]' : 'mr-[5%]'
      )}
    >
      <GiCycling className='text-2xl sm:text-[44px]' />
      <div className='flex flex-col gap-1 sm:gap-2'>
        <div className='text-xs sm:text-base'>
          <span className='font-bold'>{isEnglish ? "Carrier" : "الناقل"}:</span> {props.name}
        </div>
        <div className='text-[#4B4B4B] text-min sm:text-sm'>
          {moment(props.startDate).fromNow()}
        </div>
      </div>
    </div>
  )
}

export default OrderItemCourier
