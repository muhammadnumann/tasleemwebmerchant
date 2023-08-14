'use client'
import socket from '@/helper/Socket'
import withAuth from '@/utils/withAuth'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

const Header = dynamic(() => import('@/components/ui/Header/Header'))
const Navigation = dynamic(() => import('@/components/ui/Navigation/Navigation'))

interface IMainLayout {
  params: { locale: string }
}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({
  children,
  params
}) => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // useEffect(() => {
  //   console.log(socket.connect())

  //   const formData = new FormData()
  //   formData.append('id', '293')
  //   formData.append('type', '1')
  //   const res = axios.post('https://tasleem.in/api/frontend/web/index.php?r=api/account-retailer/simulate-notification', formData)

  //   function onConnect() {
  //     setIsConnected(true);
  //     console.log('connect')
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //     console.log('disconnect')
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('r_293', onConnect);

  //   return () => {
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header locale={params.locale} />
      {children}
      <Navigation />
    </div>
  )
}

export default withAuth(MainLayout)
