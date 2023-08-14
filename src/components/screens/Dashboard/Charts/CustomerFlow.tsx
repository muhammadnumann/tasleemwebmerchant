import React from 'react'
import { CustomerFlowChart } from './CustomerFlowChart'
import { useLang } from '@/hooks/useLang'

function CustomerFlow() {
  const { isEnglish } = useLang()

  return (
    <div className='bg-white rounded-[12px]' style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
    }}>
      <div className='p-4'>
        <p className="text-base text-[#898989]">{isEnglish ? "Customer Flow" : "تدفق العملاء"}</p>
        <div className='grid grid-cols-2'>
          <div>
            <p className='text-[#000000] font-bold text-base'>210.000 OMR</p>
            <p className='text-[#D84E00] text-xs'>{isEnglish ? "Online Order" : "طلب الشراء عبر الإنترنت"}</p>
          </div>
          <div>
            <p className='text-[#000000] font-bold text-base'>210.000 OMR</p>
            <p className='text-[#0056D8] text-xs'>{isEnglish ? "In Restaurant" : "في مطعم"}</p>
          </div>
        </div>
      </div>
      <CustomerFlowChart />
    </div>
  )
}

export default CustomerFlow