/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Loader from '@/components/ui/Dailog/loader'
import { IsAuthorizedApi } from '@/redux/services/Account'
import { useRouter } from 'next/navigation'
import React, { ElementType, useEffect, useState } from 'react'

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: any) => {
    const [loading, setLoading] = React.useState(true)
    const router = useRouter()

    React.useEffect(() => {
      async function isAuthorized() {
        try {
          const token = await IsAuthorizedApi()
          if (token?.status == 'false' || token?.status == false) {
            router.replace('/login')
          } else
            setLoading(false)
        } catch (error) {
          setLoading(false)
        }
      }
      isAuthorized()
    }, [])
    return <>
      {
        loading ?
          <Loader />
          : <WrappedComponent {...props} />
      }
    </>
  }

  return Wrapper
}
