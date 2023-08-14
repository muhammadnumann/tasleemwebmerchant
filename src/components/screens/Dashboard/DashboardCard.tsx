import { useLang } from '@/hooks/useLang'
import React from 'react'
interface Ivalue {
  text: string
  value: string
  bg: string
}
function DashboardCard({ text, value, bg }: Ivalue) {
  return (
    <div className={`xs:max-w-[210px] min-w-[170px] xs:w-auto w-full p-4 rounded-[12px] text-white`} style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
      background: bg
    }}>
      <p className="text-xl">{text}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div >
  )
}
function MainCardList() {
  const { isEnglish } = useLang()

  return (
    <div className="flex justify-between flex-wrap cl:flex-nowrap">
      <div>
        <p className="text-base text-[#898989]">{isEnglish ? "Daily Report" : "تقرير يومي"}</p>
        <div className="flex gap-5 sm:flex-nowrap flex-wrap">
          <DashboardCard
            text={isEnglish ? "Total Orders" : "إجمالي الطلبات"}
            value="69"
            bg="#49C3A1"
          />
          <DashboardCard
            text={isEnglish ? "Total Delivered" : "إجمالي تسليمها"}
            value="69"
            bg="#9689E7"
          />
          <DashboardCard
            text={isEnglish ? "Total Canceled" : "إجمالي ملغى"}
            value="69"
            bg="#EA5B5B"
          />
        </div>
      </div>
      <div className='lg:mt-0 mt-4'>
        <p className="text-base text-[#898989]">{isEnglish ? 'Monthly Report' : "تقرير شهري"}</p>
        <div className="flex gap-5 sm:flex-nowrap flex-wrap">
          <DashboardCard
            text={isEnglish ? "Your Balance" : "رصيدك"}
            value="69"
            bg="#FAB54D"
          />
          <DashboardCard
            text={isEnglish ? "Your Orders" : "إجمالي الطلبات"}
            value="69"
            bg="#654DFA"
          />
        </div>
      </div>
    </div>
  )
}



export default MainCardList