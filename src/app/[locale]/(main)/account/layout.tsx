import AccountGoback from '@/components/screens/Account/AccountGoback'
import { FC, PropsWithChildren } from 'react'

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='relative shadow-default rounded-[29px] min-h-[500px] mt-3 bg-white p-8 mx-auto w-[90%] min-[840px]:w-[795px]'>
      {children}
      <AccountGoback />
    </div>
  )
}

export default AccountLayout
