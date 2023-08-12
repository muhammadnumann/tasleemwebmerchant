/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import SmallSwitch from '@/components/ui/Switch/SmallSwitch'
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import EditIcon from '@/components/Icons/EditIcon'
import { ChangeProductStatus, DuplicateProduct } from '@/redux/services/Product'
import { useLang } from '@/hooks/useLang'
import { debounce } from 'lodash'
import Loader from '@/components/ui/Dailog/loader'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'

interface propsType {
  // register: UseFormRegister<IDirectDiscountFormValues>
  id: string
  data: any
  editisOpen: any
  seteditisOpen: Dispatch<SetStateAction<boolean>>
  setEditData: Dispatch<SetStateAction<any>>
}
const MenuList = (props: propsType) => {
  const { seteditisOpen, setEditData, data } = props
  const dispatch = useDispatch()

  const { isEnglish } = useLang()
  const [loading, setLoading] = useState(false)

  const onsubmit = async () => {
    try {
      const res = await DuplicateProduct(props.data)
      if (res.status == true)
        dispatch(ApiCalled())

    } catch (error) { }
  }
  const onProductStatusChange = async (e: any) => {
    setLoading(true)
    try {
      const res = await ChangeProductStatus({
        id: data.id,
        status: e.target.checked ? 1 : 0
      })
      if (res.status === true) {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const debouncedOnProductStatusChange = useMemo(
    () => debounce(onProductStatusChange, 500),
    []
  )

  return (
    <div>
      {loading && <Loader />}
      <div className='flex w-full'>
        <img
          src={data?.Images[0]?.image_path}
          className={`${isEnglish ? 'mr-2' : 'ml-2'} rounded-xl h-[54px]`}
          width={54}
          alt='order Image'
        />
        <div className='w-[inherit]'>
          <div className='flex justify-between'>
            <div className='w-full'>
              <span className='text-sm font-bold'>
                {isEnglish ? data?.title : data?.title_arab}
              </span>
              <p className='text-sm w-9/12 text-[#868686]'>
                {isEnglish ? data?.description : data?.description_arab}
              </p>
            </div>

            <div className='flex items-center gap-3'>
              <div className='flex items-center'>
                <p
                  className={`${isEnglish ? 'mr-2' : 'ml-2'
                    } text-sm font-medium text-gray-900 dark:text-gray-300`}
                >
                  {isEnglish ? 'QTY' : 'كمية'}
                </p>
                <div className='w-6 h-6 rounded bg-transparent border border-gray-400 flex justify-center items-center'>
                  {data?.in_stock || 0}
                </div>
              </div>
              <button
                className='flex justify-center items-center bg-[#00C2FF] rounded-full w-8 h-8'
                onClick={() => {
                  seteditisOpen(true)
                  setEditData(data)
                }}
              >
                <EditIcon />
              </button>
            </div>
          </div>
          <div className='flex justify-end items-end'>
            <button
              onClick={() => {
                onsubmit()
              }}
              className='mt-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17.25 10.5C17.25 9.5055 16.8547 8.5515 16.152 7.848C15.4485 7.14525 14.4945 6.75 13.5 6.75C11.2673 6.75 8.23275 6.75 6 6.75C5.0055 6.75 4.0515 7.14525 3.348 7.848C2.64525 8.5515 2.25 9.5055 2.25 10.5C2.25 12.7327 2.25 15.7673 2.25 18C2.25 18.9945 2.64525 19.9485 3.348 20.652C4.0515 21.3547 5.0055 21.75 6 21.75C8.23275 21.75 11.2673 21.75 13.5 21.75C14.4945 21.75 15.4485 21.3547 16.152 20.652C16.8547 19.9485 17.25 18.9945 17.25 18V10.5Z'
                  fill='#FF6B00'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6.82568 5.25H13.4999C14.8927 5.25 16.2277 5.80275 17.2124 6.7875C18.1972 7.77225 18.7499 9.10725 18.7499 10.5V17.1742C19.4647 17.028 20.1277 16.6755 20.6519 16.152C21.3547 15.4485 21.7499 14.4945 21.7499 13.5C21.7499 11.2672 21.7499 8.23275 21.7499 6C21.7499 5.0055 21.3547 4.0515 20.6519 3.348C19.9484 2.64525 18.9944 2.25 17.9999 2.25C15.7672 2.25 12.7327 2.25 10.4999 2.25C9.50543 2.25 8.55143 2.64525 7.84793 3.348C7.32443 3.87225 6.97193 4.53525 6.82568 5.25Z'
                  fill='#FF6B00'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <SmallSwitch
          id={`categorises${props.id}`}
          name={`categories`}
          text={isEnglish ? 'Available' : 'متاح'}
          value={data?.in_stock === 1 ? true : false}
          setIsAvailable={debouncedOnProductStatusChange}
        />
        <div className='text-ls font-bold mt-3'>
          <p>
            {(data?.price).toFixed(3)} {isEnglish ? 'OMR' : 'ريال'}
          </p>
        </div>
      </div>
      <div className='w-full p-[1px] bg-[#C5C5C5] mb-4 mt-1'></div>
    </div>
  )
}

export default MenuList
