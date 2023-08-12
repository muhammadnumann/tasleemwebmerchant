import icon from '@/public/images/notification.svg'
import Image from 'next/image'
import Link from 'next/link'

const HeaderNotices = () => {
  return (
    <Link
      href='/notifications'
      className='w-6 h-6 text-xs flex justify-center items-center bg-[#B2D5F6] shadow-icon rounded sm:rounded-lg sm:text-base sm:w-12 sm:h-12'
    >
      <Image src={icon} alt='notices' />
    </Link>
  )
}

export default HeaderNotices
