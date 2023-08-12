import cn from 'clsx'
import { FC } from 'react'

const OrderItemStatus: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className='p-1 md:p-2'>
      <div
        className={cn(
          'rounded-full min-w-[12px] min-h-[12px] max-w-[12px] max-h-[12px] sm:min-w-[30px] sm:min-h-[30px] sm:max-w-[30px] sm:max-h-[30px]',
          isActive
            ? 'bg-[#00D856] outline outline-4 outline-[#00D856]/50 sm:outline-8'
            : 'bg-[#D84100] outline outline-4 outline-[#D84100]/50 sm:outline-8'
        )}
      />
    </div>
  )
}

export default OrderItemStatus
