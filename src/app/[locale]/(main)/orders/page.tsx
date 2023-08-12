/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { ProductOrderListingApi } from '@/redux/services/ProductOrder'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const OrdersTabs = dynamic(() => import('@/components/screens/Orders/OrdersTabs/OrdersTabs'))
const OrdersItem = dynamic(() => import('@/components/screens/Orders/OrdersItem/OrdersItem'))
const Loader = dynamic(() => import('@/components/ui/Dailog/loader'))



const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [Data, setData] = useState()

  const apiCalled = useSelector((state: any) => state?.ApiLoading?.isCalled)

  const [orderTabsNumberObj, setOrderTabsNumbers] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0
  })

  const statusCode = [[1], [2, 3], [2, 3], [4]]

  const getList = async () => {
    setLoading(true)
    try {
      const is_ready_order = activeTab == 2 ? 1 : null
      let obj = is_ready_order
        ? {
          page: 0,
          status: statusCode[activeTab],
          is_ready_order: activeTab == 2 ? 1 : null
        }
        : {
          page: 0,
          status: statusCode[activeTab],
          is_ready_order: activeTab == 2 ? 1 : null
        }

      const res = await ProductOrderListingApi(obj)
      setData(res.data)
      const {
        order_ready_order,
        new_order,
        in_delivery_order,
        in_progress_order
      } = res || {}

      setOrderTabsNumbers({
        0: new_order,
        1: in_progress_order,
        2: order_ready_order,
        3: in_delivery_order
      })

      if (res.status === true) setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
  }, [activeTab, apiCalled])

  return (
    <div className='w-4/5 mx-auto mt-[22px]'>

      <OrdersTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderNumbersTab={orderTabsNumberObj}
      />
      <div className='flex flex-col gap-6'>
        {activeTab === 0 && (
          <OrdersItem
            type='new'
            status='not-accepted'
            data={Data}
            activeTab={activeTab}
            orderStatus={0}
          />
        )}
        {activeTab === 1 && (
          <OrdersItem
            type='progress'
            status='accepted'
            data={Data}
            activeTab={activeTab}
            orderStatus={2}
          />
        )}
        {activeTab === 2 && (
          <OrdersItem
            type='ready'
            status='accepted'
            data={Data}
            activeTab={activeTab}
            orderStatus={2}
          />
        )}
        {activeTab === 3 && (
          <OrdersItem
            type='delivery'
            status='accepted'
            data={Data}
            activeTab={activeTab}
            orderStatus={3}
          />
        )}
      </div>
      {loading && <Loader />}
    </div>
  )
}

export default OrdersPage
