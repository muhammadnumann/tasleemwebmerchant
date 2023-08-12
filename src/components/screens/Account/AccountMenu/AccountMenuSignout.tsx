import { UserLogOut } from '@/redux/store/Auth/AuthReducer'
import { useTranslations } from 'next-intl'
import { useDispatch } from 'react-redux'

const AccountMenuSignout = () => {
  const t = useTranslations('Account.Menu')

  const dispatch = useDispatch()


  return <button className='text-[#888888]' onClick={() => { dispatch(UserLogOut({ payload: false })) }}>{t('signout')}</button>
}

export default AccountMenuSignout
