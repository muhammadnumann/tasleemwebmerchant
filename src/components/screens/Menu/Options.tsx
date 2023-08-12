import DeleteIcon from '@/components/Icons/DeleteIcon'
import Input from '@/components/ui/Inputs/Input'
import React from 'react'
import { Control, FieldArrayWithId, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'
import { IProdutFormValues } from './IProductAdd.interface'
import { useLang } from '@/hooks/useLang'
interface IControl {
  fields: FieldArrayWithId<IProdutFormValues, 'Parameter'>[]
  append: any
  remove: UseFieldArrayRemove
  parameterOptionField: FieldArrayWithId<IProdutFormValues, 'Parameter'>[]
  parameterOptionAppend: any
  parameterOptionRemove: UseFieldArrayRemove
  control: Control<IProdutFormValues, any>
  register: UseFormRegister<IProdutFormValues>
  errors: any
  setValue: any
}
function Options({
  fields,
  append,
  control,
  register,
  remove,
  errors,
  setValue
}: IControl) {
  const { isEnglish } = useLang()

  return (
    <div>
      <div className='px-11'>
        <div className='text-xl font-bold flex gap-2'>{isEnglish ? "Options" : "خيارات"}
          <span onClick={() => {
            if (fields.length == 0)
              append({
                id: 0,
                title: "",
                title_arab: "",
                isNew: 1,
                ParameterOptions: [{
                  title: '',
                  title_arab: '',
                  price: ''
                }]
              })
          }
          }
            className='pb-0.5 pr-0.5 cursor-pointer bg-[#00C2FF] text-white font-extrabold text-2xl w-8 h-8 rounded-full mb-5 flex justify-center items-center'>
            +</span>
        </div>
      </div>
      {fields.map((val, index) => {
        return (
          <>
            <div className='my-3'>
              <div className='grid grid-cols-2 gap-20 px-11 pb-3'>
                <div>
                  <Input
                    rhf={{
                      control,
                      name: `Parameter.${index}.title`,
                      variant: 'underline',
                      rules: { required: { value: true, message: "Field is Required" } }
                    }}
                    placeholder={'Your Selection of Sizes:'}
                    className='!px-0.5 text-lg'
                    {...register(`Parameter.${index}.title`, {
                      required: { value: true, message: 'Field is Required' },
                    })}
                  />
                  {errors?.Parameter && (
                    <div className='Invalid'>{errors?.Parameter[index]?.title.message}</div>
                  )}
                </div>
                <div>
                  <Input
                    rhf={{
                      control,
                      name: `Parameter.${index}.title_arab`,
                      variant: 'underline',
                      rules: { required: { value: true, message: "Field is Required" } }
                    }}
                    placeholder={'اختيارك من الاحجام:'}
                    className='!px-0.5 text-lg text-rtl'
                    {...register(`Parameter.${index}.title_arab`, {
                      required: { value: true, message: 'Field is Required' },
                    })}
                  />
                  {errors?.Parameter && (
                    <div className='Invalid'>{errors?.Parameter[index]?.title_arab?.message}</div>
                  )}
                </div>
              </div>
              <div className='bg-[#EEEEEE] py-5 flex flex-col gap-4'>
                {val?.ParameterOptions?.map((optionval, i) => {
                  return (
                    <>
                      <div className='flex items-end justify-between px-11' key={optionval.id}>
                        <div>
                          <Input
                            rhf={{
                              control,
                              name: `Parameter.${index}.ParameterOptions.${i}.title`,
                              variant: 'underline',
                              // rules: { required: { value: true, message: "Field is Required" } }
                            }}
                            placeholder={'Exra Large:'}
                            className='!px-0.5 text-sm bg-transparent'
                          />
                          {/* {errors?.Parameter && (
                            <div className='Invalid'>{errors?.Parameter[index]?.ParameterOptions[i]?.title?.message}</div>
                          )} */}
                        </div>
                        <div className='flex items-end gap-4'>
                          <input id="default-radio-1" type="radio" checked name={`price.${i}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                          <div className='flex flex-col items-center'>
                            <p>Price</p>
                            <Input
                              rhf={{
                                control,
                                name: `Parameter.${index}.ParameterOptions.${i}.price`,
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
                          <span className='bg-white w-[20px] cursor-pointer h-[20px] rounded-full flex justify-center items-center' style={{
                            filter: "drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.25))"
                          }}
                            onClick={() => {
                              setValue(`Parameter.${index}.ParameterOptions`, val?.ParameterOptions?.filter((filterVal, index) => index != i))
                              append()
                              remove(fields.length)
                            }}
                          >
                            <DeleteIcon />
                          </span>
                        </div>
                        <div>
                          <Input
                            rhf={{
                              control,
                              name: `Parameter.${index}.ParameterOptions.${i}.title_arab`,
                              variant: 'underline',
                              // rules: { required: { value: true, message: "Field is Required" } }
                            }}
                            placeholder={'اختيارك من الاحجام:'}
                            className='!px-0.5 text-sm bg-transparent'
                          />
                          {/* {errors?.Parameter && (
                            <div className='Invalid'>{errors?.Parameter[index]?.ParameterOptions[i]?.title_arab?.message}</div>
                          )} */}
                        </div>
                      </div>
                    </>
                  )
                })}

                <div className='flex justify-end mr-10'>
                  <span onClick={() => {
                    setValue(`Parameter.${index}.ParameterOptions`, [
                      ...val?.ParameterOptions,
                      {
                        title: '',
                        title_arab: '',
                        price: '',
                        isNew: 1
                      }
                    ])
                    append()
                    remove(fields.length)
                  }}
                    className='pb-0.5 pr-0.5 cursor-pointer bg-[#00C2FF] text-white font-extrabold text-2xl w-8 h-8 rounded-full mb-5 flex justify-center items-center'>
                    +</span>
                </div>
              </div>
            </div>
          </>
        )
      })}

    </div>
  )
}

export default Options