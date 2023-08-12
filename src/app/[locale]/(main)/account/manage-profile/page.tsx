import dynamic from 'next/dynamic'
const ManageProfileForm = dynamic(() => import('@/components/screens/Account/ManageProfile/ManageProfileForm'))

const ManageProfilePage = () => {
  return <ManageProfileForm />
}

export default ManageProfilePage
