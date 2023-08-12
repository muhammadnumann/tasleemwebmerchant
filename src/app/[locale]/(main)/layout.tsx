'use client'
import socketInitializer from '@/helper/Socket'
import withAuth from '@/utils/withAuth'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren, useEffect } from 'react'

const Header = dynamic(() => import('@/components/ui/Header/Header'))
const Navigation = dynamic(() => import('@/components/ui/Navigation/Navigation'))

interface IMainLayout {
  params: { locale: string }
}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({
  children,
  params
}) => {
  useEffect(() => {
    socketInitializer()
  }, [])
  return (
    <div className='min-h-screen flex flex-col'>
      <Header locale={params.locale} />
      {children}
      <Navigation />
    </div>
  )
}

export default withAuth(MainLayout)
