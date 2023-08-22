export interface ITax {
  title: string
  title_ar: string
  value: string
  tId: number
}
export interface IAddons {
  product_id: number
  title: string
  title_arab: string
  description: string
  description_arab: string
  price: number
  isNew?: number
}
export interface IExclude {
  product_id: number
  title: string
  title_arab: string
  description: string
  description_arab: string
  price: number
  isNew?: number
}

export interface IParameterOption {
  id?: number
  title: string
  title_arab: string
  price: number
  isNew?: number
}
export interface IParameter {
  id?: number
  title: string
  title_arab: string
  isNew?: number
  ParameterOptions: IParameterOption[]
}
export interface IProduct {
  title: string
  title_arab: string
  description: string
  description_arab: string
  rate: number
  category_id: number
  subcategory_id: number
  favorites: number
  price: number
  discount_percentage: number
  currency: string
  in_stock: number
  image?: FormData

}
export interface IProdutFormValues {
  id?: number
  title: string
  title_arab: string
  description: string
  description_arab: string
  rate: number
  category_id: number
  subcategory_id: number
  favorites: number
  price: number
  discount_percentage: number
  currency: string
  in_stock: number
  image?: FormData

  Parameter?: IParameter[]
  addon?: IAddons[]
  exclude?: IExclude[]
}

