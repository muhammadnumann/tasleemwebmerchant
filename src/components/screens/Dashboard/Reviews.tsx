/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import UserCard from './Card'
import { ReviewsApiHandler } from '@/redux/services/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { AddReviewsData } from '@/redux/store/Dashboard'
import Loader from '@/components/ui/Dailog/loader'

function Reviews() {

  const [loading, setloading] = useState(false)
  const data = useSelector((state: any) => state?.Dashboard?.reviewsData)

  const dispatch = useDispatch()
  const fetchDat = async () => {
    setloading(true)
    try {
      const res = await ReviewsApiHandler()
      dispatch(AddReviewsData({ data: res.data }))
      setloading(false)
    } catch (error) {
      setloading(false)
    }
  }
  useEffect(() => {
    if (!data.reviews.length)
      fetchDat()
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className="flex overflow-x-auto gap-4 mt-[42px] pb-6">
        {(data.reviews || []).map((val: any, index: number) => {
          return (
            <div key={val.id} className='h-[auto]'>
              <UserCard data={val} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Reviews