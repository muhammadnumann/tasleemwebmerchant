import Checkbox from '@/components/ui/Checkbox/Checkbox'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { FieldArrayWithId, UseFormRegister } from 'react-hook-form'
import { IDirectDiscountFormValues } from '../direct-discount.interface'

interface IDirectDiscountTableCategory {
  register: UseFormRegister<IDirectDiscountFormValues>
  selectAll: (isSelect: boolean) => void
  fields: FieldArrayWithId<IDirectDiscountFormValues, 'categories', 'id'>[]
}

const DirectDiscountTableCategory: FC<IDirectDiscountTableCategory> = (
  props
) => {
  const t = useTranslations('Account.OffersManagement')

  return (
    <div className='mt-6'>
      <div className='flex gap-2 flex-col sm:items-center sm:flex-row sm:gap-6'>
        <div className='font-bold'>{t('select-category')}</div>
        <SelectAll {...props} />
      </div>
      <div className='mt-2.5 flex flex-wrap gap-x-8 gap-y-4 md:gap-x-[51px]'>
        {props.fields.map((f, i) => (
          <Checkbox
            key={f.id}
            id={`categories.${i}.value`}
            label={{ text: f.label }}
            register={props.register}
            name={`categories.${i}.value`}
          />
        ))}
      </div>
    </div>
  )
}

const SelectAll: FC<IDirectDiscountTableCategory> = (props) => {
  const t = useTranslations('Account.OffersManagement')

  return (
    <Checkbox
      register={props.register}
      name='selectAll'
      id='selectAllCats'
      label={{ text: t('select-all'), className: 'text-blue-default' }}
      rules={{
        onChange(e) {
          props.selectAll(e.target.checked)
        }
      }}
    />
  )
}

export default DirectDiscountTableCategory
