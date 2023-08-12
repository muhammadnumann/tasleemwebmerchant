'use client'
import { accountMenuItems } from '@/components/screens/Account/AccountMenu/account-menu.data'
import dynamic from 'next/dynamic'

const AccountTabTitle = dynamic(() => import('@/components/screens/Account/AccountTabTitle'))
const TaxesForm = dynamic(() => import('@/components/screens/Account/Taxes/TaxesForm/TaxesForm'))

const TaxesPage = () => {
  return (
    <>
      <AccountTabTitle {...accountMenuItems[2]} />
      <TaxesForm />
    </>
  )
}

export default TaxesPage
