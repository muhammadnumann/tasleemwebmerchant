import React from 'react'
import { DailyRevenueChart } from './DailyRevenueChart'
import { useLang } from '@/hooks/useLang'

function DailyRevenue() {
  const { isEnglish } = useLang()

  return (
    <div className='bg-white rounded-[12px]' style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
    }}>
      <div className='p-4'>
        <p className="text-base text-[#898989]">{isEnglish ? "Daily Revenue" : "الإيرادات اليومية"}</p>
        <div className='grid grid-cols-2'>
          <div>
            <p className='text-[#000000] font-bold text-base'>210.000 OMR</p>
            <p className='text-[#46A30E] text-xs'>15% +</p>
          </div>
        </div>
      </div>
      <DailyRevenueChart />

    </div>
  )
}

export default DailyRevenue