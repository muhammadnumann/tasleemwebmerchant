import logo from '@/public/images/logo.svg'
import Image from 'next/image'

const Logo = () => {
  return <Image src={logo} alt='logo' className='mt-auto' />
}

export default Logo
