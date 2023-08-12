/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useMemo, useState } from 'react'
import { ChangeSubCategoryStatus, ProductListingApi } from '@/redux/services/Product'
import { useLang } from '@/hooks/useLang'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import { DeleteProductHandler } from '@/redux/services/addons'
import { debounce } from 'lodash'

const MessageAlert = dynamic(() => import('@/components/ui/Message/Message'))
const EditProductManagerModal = dynamic(
  () => import('@/components/screens/Menu/EditProductManager')
)
const Loader = dynamic(() => import('@/components/ui/Dailog/loader'))
const ProductManagerModal = dynamic(
  () => import('@/components/screens/Menu/ProductManagerModal')
)
const MenuList = dynamic(() => import('@/components/screens/Menu/MenuList'))
const BIGSwitch = dynamic(() => import('@/components/ui/Switch/Switch'))
const MenuCats = dynamic(() => import('@/components/screens/Menu/MenuCats'))

const MenuPage = () => {
  const [catId, setCatId] = useState({ id: -1, is_stop: false })
  const [editData, setEditData] = useState()
  const [editisOpen, seteditisOpen] = useState(false)

  const apiCalled = useSelector((state: any) => state?.ApiLoading?.isCalled)
  const { isEnglish } = useLang()

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const onSubCategoryStatusChange = async (data: any) => {
    console.log(data)
    setLoading(true)
    try {
      const res = await ChangeSubCategoryStatus({
        id: data.id,
        status: data.e.target.checked ? 1 : 0,
      })
      if (res.status === true) {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const debouncedOnSbCaegoryStatusChange = useMemo(
    () => debounce(onSubCategoryStatusChange, 500),
    []
  )
  async function getList() {
    setLoading(true)
    try {
      const res = await ProductListingApi({ page: 0, subcategory_id: catId.id })
      setResult(
        res?.data.sort(function (a: any, b: any) {
          return b.id - a.id
        })
      )
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (catId.id !== -1) getList()
  }, [catId, apiCalled])

  return (
    <div className='w-[90%] mx-auto mt-[37px]'>
      {loading && <Loader />}
      <MenuCats catId={catId} setCatId={setCatId} />
      <div className='mb-4'></div>
      <BIGSwitch
        SetStatus={debouncedOnSbCaegoryStatusChange}
        id={catId}
        name={`categories.value`}
        text={isEnglish ? 'Stop Category' : 'فئة التوقف'}
      />
      {result.length === 0 && (
        <MessageAlert
          text={isEnglish ? 'No Products found' : 'لا توجد منتجات'}
        />
      )}
      {loading && <Loader />}
      <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-8 mt-4'>
        {result?.map((val: any, ind: number) => {
          return (
            <MenuList
              key={val?.id}
              id={`${ind}`}
              data={val}
              editisOpen={editisOpen}
              seteditisOpen={seteditisOpen}
              setEditData={setEditData}
            />
          )
        })}
        <div></div>
      </div>
      <ProductManagerModal />
      {editisOpen && (
        <EditProductManagerModal
          data={editData}
          editisOpen={editisOpen}
          seteditisOpen={seteditisOpen}
        />
      )}
    </div>
  )
}

export default MenuPage
