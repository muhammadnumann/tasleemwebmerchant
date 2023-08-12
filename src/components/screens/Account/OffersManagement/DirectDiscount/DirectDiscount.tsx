import { useTranslations } from 'next-intl'
import DirectDiscountTable from './DirectDiscountTable/DirectDiscountTable'
import { DirectOfferApi } from '@/redux/services/Coupon'
import { useEffect, useState } from 'react'
import { IDirectDiscountFormValues } from './direct-discount.interface'

const DirectDiscount = () => {
  const t = useTranslations('Account.OffersManagement')
  const [data, setData] = useState<IDirectDiscountFormValues>()
  const fetchData = async () => {
    try {
      const res = await DirectOfferApi()
      setData(res.data)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='mt-12'>
      <div className='text-lg font-bold text-center'>
        {t('direct-discount')}
      </div>
      {data && <DirectDiscountTable data={data} />}
    </div>
  )
}

export default DirectDiscount
