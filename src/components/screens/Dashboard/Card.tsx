import { useLang } from '@/hooks/useLang'
import moment from 'moment'
import React from 'react'

function UserCard() {
  const { isEnglish } = useLang()

  return (
    <div className='bg-white rounded-[12px] w-[255px] p-4' style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)"
    }}>
      <div className='flex gap-2 relative w-full'>
        <div className='w-[32px] h-[32px] bg-[#D9D9D9] rounded-full'></div>
        <div>
          <p className='text-[#404040] text-[10px]'>Hashim Naji</p>
          <p className='text-[#404040] text-[10px]'>98833471</p>
          <p className={`text-[#404040] text-[10px] absolute top-0 ${isEnglish ? "right-0" : "left-0"}`}>{moment(new Date()).format('DD/MM/YYYY')}</p>
        </div>
      </div>
      <p className='text-[#7B7B7B] text-[10px] mt-5'>Google Play Games beta is now available to players in 50+ countries, subject to device and account eligibility.</p>
      <div className='flex items-center gap-2 mt-3'>
        <svg xmlns="http://www.w3.org/2000/svg" width={15} height={14} viewBox="0 0 15 14" fill="none">
          <path d="M6.54894 0.927048C6.8483 0.00573778 8.1517 0.0057404 8.45106 0.927051L9.40837 3.87336C9.54224 4.28538 9.9262 4.56434 10.3594 4.56434H13.4574C14.4261 4.56434 14.8289 5.80395 14.0451 6.37336L11.5389 8.19427C11.1884 8.44892 11.0417 8.90028 11.1756 9.31231L12.1329 12.2586C12.4323 13.1799 11.3778 13.946 10.5941 13.3766L8.08778 11.5557C7.7373 11.3011 7.2627 11.3011 6.91221 11.5557L4.40594 13.3766C3.62222 13.946 2.56774 13.1799 2.8671 12.2586L3.82441 9.3123C3.95828 8.90028 3.81162 8.44892 3.46114 8.19427L0.954859 6.37335C0.171145 5.80395 0.573923 4.56434 1.54265 4.56434H4.64057C5.0738 4.56434 5.45776 4.28538 5.59163 3.87336L6.54894 0.927048Z" fill="#FFB800" />
        </svg>
        <p className='text-[#000000] text-[10px]'>3.5 {isEnglish ? 'Average' : "متوسط"} </p>
        <p className={`text-[#000000] text-[10px] ${isEnglish ? 'ml-auto' : 'mr-auto'}`}>#167133 </p>
      </div>
    </div>
  )
}

export default UserCard