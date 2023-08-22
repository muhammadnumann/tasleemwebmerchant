import DeleteIcon from '@/components/Icons/DeleteIcon'
import React from 'react'
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister
} from 'react-hook-form'
import { IProdutFormValues } from './IProductAdd.interface'
import Input from '@/components/ui/Inputs/Input'
import { useLang } from '@/hooks/useLang'

interface IControl {
  fields: FieldArrayWithId<IProdutFormValues, 'addon'>[]
  append: any
  remove: UseFieldArrayRemove
  control: Control<IProdutFormValues, any>
  register?: UseFormRegister<IProdutFormValues>
  // errors: any
  productId?: number
}

function Exclude({ fields, append, control, remove, productId }: IControl) {
  const { isEnglish } = useLang()

  return (
    <div>
      <div className='px-11'>
        <div className='text-xl font-bold flex gap-2'>
          {isEnglish ? "Exclude" : "استبعاد"}
          <span
            onClick={() => {
              append({
                product_id: productId,
                title: '',
                title_arab: '',
                description: '',
                description_arab: '',
                price: 0,
                isNew: 1
              })
            }}
            className='pb-0.5 pr-0.5 cursor-pointer bg-[#00C2FF] text-white font-extrabold text-2xl w-8 h-8 rounded-full mb-5 flex justify-center items-center'
          >
            +
          </span>
        </div>
      </div>
      {fields.map((val: any, index: number) => {
        return (
          <>
            <div className='my-3'>
              <div className='grid grid-cols-2 gap-20 px-11 pb-3'>
                <div>
                  <Input
                    rhf={{
                      control,
                      name: `exclude.${index}.title`,
                      variant: 'underline',
                      rules: {
                        required: { value: true, message: 'Field is Required' }
                      }
                    }}
                    placeholder={'Title in English'}
                    className='!px-0.5 text-lg'
                  />
                </div>
                <div>
                  <Input
                    rhf={{
                      control,
                      name: `exclude.${index}.title_arab`,
                      variant: 'underline',
                      rules: {
                        required: { value: true, message: 'Field is Required' }
                      }
                    }}
                    placeholder={'العنوان بالعربية'}
                    className='!px-0.5 text-lg text-rtl'
                  />
                </div>
              </div>
              <div className='bg-[#EEEEEE] py-5 flex flex-col gap-4'>
                <div className='flex items-end justify-between px-11'>
                  <div>
                    <Input
                      rhf={{
                        control,
                        name: `exclude.${index}.description`,
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      placeholder={'Description in English'}
                      className='!px-0.5 text-sm bg-transparent'
                    />
                  </div>
                  <div className='flex items-end gap-4'>
                    {/* <input id="default-radio-1" type="radio" checked name={`exclude.${index}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                    <div className='flex flex-col items-center'>
                      <p>Price</p>
                      <Input
                        rhf={{
                          control,
                          name: `exclude.${index}.price`,
                          rules: {
                            required: {
                              value: true,
                              message: 'Field is Required'
                            }
                          },
                          containerClass:
                            'text-center w-16 h-5 bg-white rounded border border-[#AEAEAE] text-sm'
                        }}
                        placeholder={''}
                        className='!px-0.5 text-sm bg-transparent w-16 !h-5 !border-0'
                      />
                    </div>
                    <button
                      className='bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center'
                      style={{
                        filter: 'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))'
                      }}
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  <div>
                    <Input
                      rhf={{
                        control,
                        name: `exclude.${index}.description_arab`,
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      placeholder={'الوصف بالعربية'}
                      className='!px-0.5 text-sm bg-transparent text-rtl'
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Exclude
