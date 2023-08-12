import cn from 'clsx'
import { FC } from 'react'
import { IOrder } from '../orders.interface'
interface value {
  number: number,
  paymentType: string
}
const OrderItemNumberAndCash: FC<value> = ({ number, paymentType }) => {
  const isCard = paymentType === 'card'

  return (
    <div className='flex flex-col gap-3 text-xs sm:text-base'>
      <div className='px-1 py-0.5 rounded-lg flex justify-center items-center bg-[#00D856]/10 font-bold text-[#00D856] sm:px-3 sm:py-1'>
        {number}
      </div>
      <div
        className={cn(
          'px-1 py-0.5 rounded-lg flex justify-center items-center sm:px-3 sm:py-1',
          isCard ? 'text-[#FF7A00] bg-[#FF7A00]/20 font-black' : 'bg-[#D9D9D9]'
        )}
      >
        {isCard ? 'Card' : 'Cash'}
      </div>
    </div>
  )
}

export default OrderItemNumberAndCash
