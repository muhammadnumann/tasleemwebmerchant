import Input from '@/components/ui/Inputs/Input'
import { FC } from 'react'
import { Control, UseFieldArrayRemove } from 'react-hook-form'
import { LuTrash2 } from 'react-icons/lu'
import { ITaxesFormValues } from '../taxes.inteface'

interface ITaxesFormItem {
  index: number
  control: Control<ITaxesFormValues, any>
  remove: any
  register: any
  errors: any
}

const TaxesFormItem: FC<ITaxesFormItem> = ({
  index,
  control,
  remove,
  register,
  errors
}) => {
  return (
    <div className='flex gap-3.5 p-1.5 rounded-lg items-center bg-white shadow-icon'>
      <div
        className='rounded-full border border-gray-100 p-1 cursor-pointer'
        onClick={() => remove(index)}
      >
        <LuTrash2 color='#FF5151' size={14} />
      </div>
      <div className='flex gap-1 items-center'>
        <Input
          rhf={{
            control,
            name: `taxes.${index}.title`,
            variant: 'underline',
            rules: { required: true }
          }}
          className='text-xs'
          dir='ltr'
        // {...register(`taxes.${index}.title`, {
        //   required: { value: true, message: 'Field is Required' }
        // })}
        />
        {/* {errors[`taxes.${index}.title`] && (
          <div className='Invalid mx-auto w-full max-w-[276px]'>{`${errors[
            `taxes.${index}.title`
          ]?.message}`}</div>
        )} */}
        <Input
          rhf={{
            control,
            name: `taxes.${index}.title_ar`,
            variant: 'underline',
            rules: { required: true }
          }}
          className='text-xs'
          dir='rtl'
        />
        <Input
          rhf={{
            control,
            name: `taxes.${index}.value`,
            variant: 'underline',
            rules: { required: true },
            containerClass: 'w-[30%]'
          }}
          className='text-xs text-center'
        />
      </div>
    </div>
  )
}

export default TaxesFormItem
