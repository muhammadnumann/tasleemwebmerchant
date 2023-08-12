import { Dispatch, SetStateAction } from "react"

export interface IOrder {
  type: 'new' | 'progress' | 'ready' | 'delivery'
  status: 'accepted' | 'not-accepted'
  data: any
  activeTab: number
  orderStatus: number
}
