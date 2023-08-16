/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useLang } from '@/hooks/useLang'
import { ProductOrderCancelApi, ProductOrderConfirmApi, ProductOrderDetailById } from '@/redux/services/ProductOrder'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import OrderReciept from './OrderReciept'
import ReactToPrint from 'react-to-print';
import Loader from '@/components/ui/Dailog/loader'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'

function OrderModal(props: any) {
  const SelectedData = props.data
  const closeModal = props.closeModal
  const { isEnglish } = useLang()
  const [result, setResult] = useState<any>()
  const [loading, setloading] = useState(true)

  const fetchData = async () => {
    const res = await ProductOrderDetailById({ id: SelectedData.id })
    setResult(res.data[0])
    setloading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const dispatch = useDispatch()

  const handleReject = async (id: number) => {
    setloading(true)
    try {
      const res = await ProductOrderCancelApi({ id })
      setloading(false)
      dispatch(ApiCalled())
      closeModal()

    } catch (error) {
      setloading(false)
    }
  }
  const handleAccept = async (id: number) => {
    setloading(true)
    try {
      const res = await ProductOrderConfirmApi({ id })
      if (res.status === true) {
        closeModal()
        dispatch(ApiCalled())
        setloading(false)
      }
    } catch (error) {
      setloading(false)
    }
  }

  let discout = 0;
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {loading && <Loader />}
      <div className='flex gap-[70px] pt-3 items-baseline px-[30px]'>
        <div className='flex gap-3 w-[135px]'>
          <div>
            {moment(new Date(result?.date_created)).format("MMM DD, YYYY \nHH:MM")}
          </div>
          <div>
            <ReactToPrint
              trigger={() => <span className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 24 28" fill="none">
                  <path d="M17.3389 22.435V18.2429H6.55926V22.435M17.3389 22.435V26.6271H6.55926V22.435M17.3389 22.435H22.7288V9.85873H17.3389M6.55926 22.435H1.16943V9.85873H6.55926M17.3389 9.85873H6.55926M17.3389 9.85873V2.87191C17.3389 2.10018 16.7357 1.47455 15.9915 1.47455H7.90672C7.16255 1.47455 6.55926 2.10018 6.55926 2.87191V9.85873" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>}
              content={() => componentRef.current}
            />

          </div>
        </div>
        <h2 className='text-2xl font-black'>{isEnglish ? "ORDER" : "طلب"} # {result?.id}</h2>
        <p className={`text-2xl font-black  ${isEnglish ? "ml-auto" : "mr-auto"}`}>23</p>
      </div>

      <div className='flex flex-col items-center px-[30px] mb-8'>
        <p>{result?.customer}</p>
        <p>+ {result?.customer_phone}</p>
      </div>
      {/* Menu */}
      {
        result?.products.map((val: any, i: number) => {
          discout = val.single_discount + discout
          return (
            <div key={val.id} className='px-[30px]'>
              <div className='flex justify-between items-start'>
                <div className='flex'>
                  <img src={val?.Images[0]?.image_path} className={`${isEnglish ? "mr-2" : "ml-2"} rounded-xl`} width={54} height={54} alt="order Image" />
                  <div className='mt-1'>
                    <p className='text-sm font-bold '>{isEnglish ? val.title : val.title_arab}</p>
                    <p className='text-sm  font-bold text-gray-500'>{(val.addons || []).map((addval: any, ind2: number) => (ind2 !== 0 ? " + " : "") + (isEnglish ? addval.title : addval.title_arab))}</p>
                  </div>
                </div>
                <div>
                  <p className='text-lg font-bold text-[#00C2FF]'>X {val.amount}</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>{val.product_price} {isEnglish ? "OMR" : "ريال"}</p>
                </div>
              </div>
              <div className='w-full p-[1px] bg-[#C5C5C5] mt-4'></div>
              <div className='text-center mb-4 text-xs text-gray-700'>{result?.order_comment}</div>
            </div>
          )
        })
      }
      <div className='flex flex-col gap-1 px-[30px] mb-10 pt-8'>
        <div className='flex justify-between text-lg font-bold'><p>{isEnglish ? "Subtotal" : "المجموع الفرعي"}</p><p>{(result?.sub_total || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
        {
          (result?.tax || []).map((value: any, index: number) => {
            return (
              <>
                <div className='flex justify-between text-sm font-bold mr-2'><p>{isEnglish ? "Tax " : " ضريبة"} {index + 1}</p><p>{(value || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
              </>
            )
          })
        }
        <div className='flex justify-between text-lg font-bold'><p>{isEnglish ? "Deleivery Fee" : "رسوم التوصيل"}</p><p>{(result?.delivery_price || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
        <div className='flex justify-between text-lg font-bold'><p>{isEnglish ? "Merchant Deleivery" : "تسليم التاجر"}</p><p>{(1 || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
        <div className='flex justify-between text-lg font-bold'><p>{isEnglish ? "Discout Coupon" : "كوبون الخصم"}</p><p>{(result?.tasleem_discount || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
        <div className='flex justify-between text-lg font-bold mt-4'><p>{isEnglish ? "Total" : "المجموع"}</p><p>{result?.total_price.toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
      </div>

      <span className='bg-[#D9D9D9] rounded-lg py-2 px-3 text-black text-sm mx-[30px] capitalize'>{result?.payment_method} {isEnglish ? "Payment" : "قسط"}</span>

      <div className='mt-4 '></div>
      {
        props.type === 'new' && (
          <>
            <div className="flex w-full gap-2 p-4" style={{ boxShadow: " 0px -2px 4px 0px rgba(0, 0, 0, 0.25)" }}>
              <button onClick={() => {
                handleReject(result?.id)
              }} className='text-2xl bg-[#FF4F27] text-white uppercase  rounded-lg py-3 w-1/3' style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}>{isEnglish ? "Reject" : "يرفض"}</button>
              <button onClick={() => {
                handleAccept(result?.id)
              }} className='text-2xl flex gap-8 justify-center items-center bg-[#00C2FF] text-white uppercase  rounded-lg py-3 w-2/3' style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}>{isEnglish ? "Accept" : "يقبل"}
                <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                  <path d="M8.79833 18.0417V40.1667H4.84041C2.62791 40.1667 0.85791 38.3967 0.85791 36.2088V22.0242C0.85791 19.8363 2.65249 18.0417 4.84041 18.0417H8.79833ZM36.4791 14.3542H24.7283V5.75004C24.7283 3.04587 22.5158 0.833374 19.8362 0.833374H19.615C18.6316 0.833374 17.7466 1.42337 17.3533 2.33296L10.6421 18.0417V40.1667H33.2587C35.0533 40.1667 36.5775 38.8884 36.8971 37.1184L40.1421 18.6809C40.5354 16.4192 38.8146 14.3542 36.5037 14.3542H36.4791Z" fill="white" />
                </svg>
              </button>
            </div>
          </>
        )
      }
      {
        result &&
        <div className='absolute left-[-9999px] top-[-9999px]'>
          <div ref={componentRef} >
            <OrderReciept data={result} />
          </div>
        </div>
      }
    </>
  )
}

export default OrderModal