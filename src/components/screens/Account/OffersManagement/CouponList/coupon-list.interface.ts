export interface ICoupon {
  id: string
  apply_type: string
  coupon_code: string
  end_date: Date
  percentage: string
  product_coupon_discount: string
  product_coupon_max_amount: string
  product_coupon_type: string
  start_date: Date
  use_limit: string

}


export const nullCoupun = {
  id: '0',
  apply_type: '',
  coupon_code: '',
  end_date: new Date(''),
  percentage: '',
  product_coupon_discount: '',
  product_coupon_max_amount: '',
  product_coupon_type: '',
  start_date: new Date(''),
  use_limit: ''
}