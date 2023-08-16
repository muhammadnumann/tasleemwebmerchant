/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Noticfication from '@/components/ui/noticfication/Noticfication'
import socket from '@/helper/Socket'
import { getLocalStorage } from '@/redux/store/Auth/AuthActions'
import { AddNoticficationData } from '@/redux/store/Dashboard'
import withAuth from '@/utils/withAuth'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = dynamic(() => import('@/components/ui/Header/Header'))
const Navigation = dynamic(() => import('@/components/ui/Navigation/Navigation'))

interface IMainLayout {
  params: { locale: string }
}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({
  children,
  params
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    socket.connect()
    const user = getLocalStorage('userData')
    const channel_id = user?.user?.channel_id

    socket.on(`${channel_id}`, (data) => {
      dispatch(AddNoticficationData({ data: data }))
    });
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Noticfication />
      <Header locale={params.locale} />
      {children}
      <Navigation />
    </div>
  )
}

export default withAuth(MainLayout)
