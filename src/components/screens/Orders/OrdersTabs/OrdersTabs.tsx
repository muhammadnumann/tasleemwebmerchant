import cn from 'clsx'
import { useTranslations } from 'next-intl'
import { Dispatch, FC, SetStateAction } from 'react'
import { ordersTabs } from './orders-tabs.data'

interface IOrdersTabs {
  activeTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  orderNumbersTab: {
    [key: number]: number
  }
}

const OrdersTabs: FC<IOrdersTabs> = ({
  setActiveTab,
  activeTab,
  orderNumbersTab
}) => {
  const t = useTranslations('Orders.Tabs')

  return (
    <div className='flex justify-center gap-3.5 sm:gap-[26px]'>
      {ordersTabs?.map((tab, i) => (
        <button
          key={tab.text}
          onClick={() => setActiveTab(i)}
          className={cn(
            'px-4 py-2 duration-300 relative flex justify-center items-center rounded-[43px] shadow-icon text-min sm:w-[174px] sm:text-xl sm:py-4',
            activeTab === i
              ? 'text-white bg-blue-default font-bold'
              : 'bg-[#C0C0C0]'
          )}
        >
          {t(tab?.text)}
          <div className='absolute border font-bold text-white border-white bg-blue-default rounded-full w-4 h-4 flex justify-center items-center right-1 -top-2 sm:right-2 sm:-top-3 sm:w-7.5 sm:h-7'>
            {orderNumbersTab[i]}
          </div>
        </button>
      ))}
    </div>
  )
}

export default OrdersTabs
