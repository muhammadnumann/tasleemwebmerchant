'use client'
import { accountMenuItems } from '@/components/screens/Account/AccountMenu/account-menu.data'
import dynamic from 'next/dynamic'
const DirectDiscount = dynamic(() => import('@/components/screens/Account/OffersManagement/DirectDiscount/DirectDiscount'))
const CouponList = dynamic(() => import('@/components/screens/Account/OffersManagement/CouponList/CouponList'))
const AccountTabTitle = dynamic(() => import('@/components/screens/Account/AccountTabTitle'))

const OffersManagementPage = () => {
  return (
    <div className='w-3/5 mx-auto md:w-1/2'>
      <AccountTabTitle {...accountMenuItems[1]} />
      <DirectDiscount />
      <CouponList />
    </div>
  )
}

export default OffersManagementPage
