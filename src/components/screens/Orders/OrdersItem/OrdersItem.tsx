import { useLang } from '@/hooks/useLang'
import cn from 'clsx'
import { FC, useState } from 'react'
import { IOrder } from '../orders.interface'
import OrderItemCourier from './OrderItemCourier'
import OrdersItemMainInfo from './OrderItemMainInfo'
import OrderItemNumberAndCash from './OrderItemNumberAndCash'
import OrderItemStatus from './OrderItemStatus'
import { ProductOrderReadyApi } from '@/redux/services/ProductOrder'
import Loader from '@/components/ui/Dailog/loader'
import Modal from '@/components/ui/Modal'
import OrderModal from './orderModal'
import MessageAlert from '@/components/ui/Message/Message'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'

const OrdersItem: FC<IOrder> = (props) => {
  const { isEnglish } = useLang()
  const [loading, setLoading] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const dispatch = useDispatch()

  const handleOrderReady = async (id: number) => {
    setLoading(true)
    const res = await ProductOrderReadyApi({ id })

    if (res.status === true) {
      setLoading(false)
      dispatch(ApiCalled())
    } else setLoading(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }


  if (!props.data?.length) {
    return <MessageAlert
      text={isEnglish ? 'No Order found' : 'لم يتم العثور على طلب'}
    />
  }

  return (
    <>
      {loading && <Loader />}

      {(props.data || []).map((val: any, ind: number) => {
        return (
          <>
            <div className='flex items-center gap-2 border-b border-b-[#B9B9B9] py-4 sm:gap-4'>
              <div className='flex items-center gap-2 cursor-pointer'
                onClick={() => {
                  openModal()
                  setSelectedData(val)
                }}
              >
                <OrderItemStatus isActive={props.status === 'accepted'} />
                <OrdersItemMainInfo
                  name={val.id}
                  count={val.products[0].amount}
                  date={(val.date_updated_new * 1000)}
                />
              </div>
              {props.type === 'delivery' && (
                <OrderItemCourier
                  name={val.driver}
                  startDate={val.date_updated}
                />
              )}
              <div
                className={cn(
                  'self-end flex items-center gap-5 sm:gap-[34px]',
                  isEnglish ? 'ml-auto' : 'mr-auto'
                )}
              >
                {props.type === 'progress' && (
                  <button
                    onClick={() => {
                      handleOrderReady(val.id)
                    }}
                    className='w-[70px] h-8 rounded-lg border border-blue-default text-blue-default font-bold text-sm sm:w-[109px] sm:h-[52px] sm:text-xl'
                  >
                    {isEnglish ? 'Ready' : 'مستعد'}
                  </button>
                )}
                <OrderItemNumberAndCash
                  number={val.order_num}
                  paymentType={val.payment_method}
                />
              </div>
            </div>
          </>
        )
      })}
      {modalIsOpen &&
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <OrderModal
            data={selectedData}
            closeModal={closeModal}
          />  
        </Modal>
      }

    </>
  )
}

export default OrdersItem
