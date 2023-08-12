import { IManageProfileInput } from './manage-profile.interface'

// All "placeholder" properties here are keys for src/messages
export const manageProfileInputs: IManageProfileInput[] = [
  {
    name: 'company_name',
    placeholder: 'english-name'
  },
  {
    name: 'company_name_arab',
    placeholder: 'arabic-name'
  },
  {
    name: 'description',
    placeholder: 'english-desc'
  },
  {
    name: 'description_arab',
    placeholder: 'arabic-desc'
  },
  {
    name: 'mobile_number',
    placeholder: 'mobile'
  }
  // {
  //   name: 'accounting_email',
  //   placeholder: 'email'
  // }
]
