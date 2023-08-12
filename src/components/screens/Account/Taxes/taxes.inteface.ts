export interface ITax {
  title: string
  title_ar: string
  value: string
  id: number
  tid: number
}

export interface ITaxesFormValues {
  taxes: ITax[]
}
