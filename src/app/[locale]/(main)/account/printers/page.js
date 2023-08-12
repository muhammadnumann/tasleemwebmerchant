'use client'
import React from 'react'
import { accountMenuItems } from '@/components/screens/Account/AccountMenu/account-menu.data'
import dynamic from 'next/dynamic'
const PrinterForm = dynamic(() =>
  import('@/components/screens/Account/Printer/PrinterForm')
)
const AccountTabTitle = dynamic(() =>
  import('@/components/screens/Account/AccountTabTitle')
)

function index() {
  return (
    <div className='w-3/5 mx-auto md:w-1/2'>
      <AccountTabTitle {...accountMenuItems[4]} />
      <PrinterForm />
    </div>
  )
}

export default index
