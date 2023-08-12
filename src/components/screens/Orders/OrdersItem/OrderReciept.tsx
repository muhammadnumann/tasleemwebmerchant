import Modal from '@/components/ui/Modal'
import { useLang } from '@/hooks/useLang';
import moment from 'moment';
import React from 'react'
import ReactModal from 'react-modal'


function OrderReciept(props: any) {
  const { data } = props

  const { isEnglish } = useLang()

  let extraPrice = 0

  const discount = data.tasleem_discount + data.vendor_discount
  return (
    <>
      <div className='w-[220px] text-black'>
        <div>
          <div className='text-center'>

            <h1 className='text-2xl font-bold'>Tasleem</h1>
            <p className='text-sm font-medium'>{`McDonald's`}</p>
            <p className='text-[10px] font-medium'>{data.customer_zone_name}</p>
            <p className='text-[10px] font-medium'>{moment(new Date()).format("DD/MM/YYYY  HH:MM")}</p>
            <p className='text-base font-bold'>#{data.id}</p>
            <p className='text-base font-bold'>{data.customer_name} </p>
            <p className='text-sm font-bold'>+92132465 </p>
            <div className='border-t-[1px] border-b-[1px] border-black py-2'>
              <p className='text-sm font-bold'> {data.payment_method} Payment</p>
            </div>
          </div>
          <div className='mt-[22px]'>
            {
              data?.products.map((val: any, i: number) => {

                return (
                  <div key={val.id} className='px-[8px]'>
                    <div className='flex justify-between items-center'>
                      <div className='flex'>
                        <div className=''>
                          <p className='text-[10px] font-bold max-w-[100px]'>{isEnglish ? val.title : val.title_arab}</p>
                          <p className='text-[8px]  font-bold'>
                            {
                              (val.options || []).map((addval: any, ind2: number) => {
                                extraPrice = extraPrice + addval.option_price
                                return (
                                  <>
                                    {(ind2 !== 0 ? " + " : "") + (isEnglish ? addval.option_title + ' Size' : addval.option_title_arab + 'مقاس ')}
                                  </>
                                )
                              })
                            }
                          </p>
                          <p className='text-[8px]  font-bold'>
                            {
                              (val.addons || []).map((addval: any, ind2: number) => {
                                extraPrice = extraPrice + addval.addon_price
                                return (
                                  <>
                                    {(ind2 !== 0 ? " + " : "") + (isEnglish ? addval.title : addval.title_arab)}
                                  </>
                                )
                              })
                            }
                          </p>
                          <p className='text-[8px]  font-bold'>
                            {
                              (val.excluded || []).map((addval: any, ind2: number) => {
                                return (
                                  <>
                                    {(ind2 !== 0 ? " - " : "") + (isEnglish ? addval.title : addval.title_arab)}
                                  </>
                                )
                              })
                            }
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-bold '>X {val.amount}</p>
                      </div>
                      <div>
                        <p className='text-[10px] font-bold mb-2'>{val.product_price.toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p>
                        {extraPrice != 0 && <p className='text-[10px] font-bold '>{extraPrice.toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p>}
                      </div>
                    </div>
                    <div className='w-full p-[0.5px] bg-[#C5C5C5] my-2'></div>
                  </div>
                )
              })
            }
            {
              data?.notes &&
              <div className='px-[8px]'>
                <div className='text-center mb-1 font-bold text-md'>Notes</div>
                <div className='text-center mb-4 text-xs text-gray-700'>{data?.notes}</div>
                <div className='w-full p-[0.5px] bg-[#C5C5C5] my-2'></div>
              </div>
            }
            <div className='px-[8px]'>
              <div className='text-center mb-1 font-bold text-md'>Discount</div>
              <p className='text-md text-center font-bold mb-2'>{discount.toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p>
              <div className='w-full p-[0.5px] bg-[#C5C5C5] my-2'></div>
            </div>

            <div className='flex flex-col gap-1 px-[8px] mb-10 pt-8'>
              <div className='flex justify-between text-[10px] font-bold'><p>{isEnglish ? "Subtotal" : "المجموع الفرعي"}</p><p>{(data.sub_total || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
              {
                (data?.tax || []).map((value: any, index: number) => {
                  return (
                    <>
                      <div className='flex justify-between text-[10px] font-bold '><p>{isEnglish ? "Tax " : " ضريبة"}{index + 1}</p><p>{(value || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
                    </>
                  )
                })
              }
              <div className='flex justify-between text-[10px] font-bold'><p>{isEnglish ? "Deleivery Fee" : "رسوم التوصيل"}</p><p>{(data.delivery_price || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
              <div className='flex justify-between text-[10px] font-bold'><p>{isEnglish ? "Merchant Deleivery" : "تسليم التاجر"}</p><p>{(1 || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
              <div className='flex justify-between text-[10px] font-bold'><p>{isEnglish ? "Discout Coupon" : "كوبون الخصم"}</p><p>{(data.tasleem_discount || 0).toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
              <div className='flex justify-between text-[10px] font-bold mt-4'><p>{isEnglish ? "Total" : "المجموع"}</p><p>{data.total_price.toFixed(3)} {isEnglish ? "OMR" : "ريال"}</p></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderReciept