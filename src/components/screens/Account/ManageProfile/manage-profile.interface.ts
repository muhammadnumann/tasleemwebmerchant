import { Path } from 'react-hook-form'

export interface IManageProfileFormValues {
  company_name: string
  company_name_arab: string
  description: string
  description_arab: string
  mobile_number: string

  image_path: FormData
  feature_banner_path: FormData
  banner_image_path: FormData
}

export interface IManageProfileInput {
  name: Path<IManageProfileFormValues>
  placeholder:
  | 'english-name'
  | 'arabic-name'
  | 'english-desc'
  | 'arabic-desc'
  | 'mobile'
  | 'email'
}
