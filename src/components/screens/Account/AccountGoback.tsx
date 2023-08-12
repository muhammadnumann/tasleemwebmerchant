'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsArrowLeft } from 'react-icons/bs'

const AccountGoback = () => {
  const pathname = usePathname()
  const isArrow = pathname !== '/en/account' && pathname !== '/ar/account'

  return (
    isArrow && (
      <Link href='/account' className='absolute top-8 left-8 md:left-14'>
        <BsArrowLeft size={34} color='#7D7D7D' />
      </Link>
    )
  )
}

export default AccountGoback
