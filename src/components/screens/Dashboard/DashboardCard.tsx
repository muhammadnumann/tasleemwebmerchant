import Loader from '@/components/ui/Dailog/loader'
import { useLang } from '@/hooks/useLang'
import { DashbpardApiHandler } from '@/redux/services/Dashboard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
interface Ivalue {
  text: string
  value: any | undefined
  bg: string
}
function DashboardCard({ text, value, bg }: Ivalue) {
  return (
    <div className={`xs:max-w-[210px] min-w-[170px] xs:w-auto w-full p-4 rounded-[12px] text-white`} style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
      background: bg
    }}>
      <p className="text-xl">{text}</p>
      <p className="text-2xl font-bold mt-1">{value || 0}</p>
    </div >
  )
}
function MainCardList() {
  const data = useSelector((state: any) => state?.Dashboard?.Data)
  const { isEnglish } = useLang()

  return (
    <>
      <div className="flex justify-between flex-wrap cl:flex-nowrap">
        <div>
          <p className="text-base text-[#898989]">{isEnglish ? "Daily Report" : "تقرير يومي"}</p>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <DashboardCard
              text={isEnglish ? "Total Orders" : "إجمالي الطلبات"}
              value={data?.total_orders_daily}
              bg="#49C3A1"
            />
            <DashboardCard
              text={isEnglish ? "Total Delivered" : "إجمالي تسليمها"}
              value={data?.total_delivered_daily}
              bg="#9689E7"
            />
            <DashboardCard
              text={isEnglish ? "Total Canceled" : "إجمالي ملغى"}
              value={data?.total_cancelled_daily}
              bg="#EA5B5B"
            />
          </div>
        </div>
        <div className='lg:mt-0 mt-4'>
          <p className="text-base text-[#898989]">{isEnglish ? 'Monthly Report' : "تقرير شهري"}</p>
          <div className="flex gap-5 sm:flex-nowrap flex-wrap">
            <DashboardCard
              text={isEnglish ? "Your Balance" : "رصيدك"}
              value={`${(data?.total_balance_monthly || 0).toFixed(3)}` + '   ' + (isEnglish ? '  OMR' : 'ريال  ')}
              bg="#FAB54D"
            />
            <DashboardCard
              text={isEnglish ? "Your Orders" : "إجمالي الطلبات"}
              value={data?.total_orders_monthly}
              bg="#654DFA"
            />
          </div>
        </div>
      </div>
    </>
  )
}



export default MainCardList