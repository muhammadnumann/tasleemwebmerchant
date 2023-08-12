import React, { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { CategoryOptions } from '../Account/OffersManagement/CouponList/coupon-list.data'
import Input from '@/components/ui/Inputs/Input'
import TextArea from '@/components/ui/Inputs/TextArea'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import moment from 'moment'
import { useFieldArray, useForm } from 'react-hook-form'
import Select from '@/components/ui/Select/Select'
import Addons from './Addons'
import { IProdutFormValues } from './IProductAdd.interface'
import {
  CreateProduct,
  ProductSubCategory
} from '@/redux/services/Product'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import ProductImgUploader from './ProductImgUploader'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'
import Options from './Options'
import Loader from '@/components/ui/Dailog/loader'

function ProductManagerModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(CategoryOptions[0])
  const [loading, setloading] = useState(false)
  const [result, setResult] = useState<ISelectItem[]>([
    { label: 'Select Category', value: 0 }
  ])
  const CategoryList = async () => {
    try {
      const res = await ProductSubCategory()
      const categories = res.data.map((v: any) => {
        return { label: v.title, value: v?.id }
      })
      setResult(categories)
      setSelectedCategory(categories[0])
    } catch (error) { }
  }

  useEffect(() => {
    CategoryList()
  }, [])

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<IProdutFormValues>({
    mode: 'all'
  })


  const { fields: OptionsField, append: OptionsAppend, remove: OptionsRemove } = useFieldArray({
    name: 'Parameter',
    control
  })

  const {
    fields: AddonsField,
    append: AddonsAppend,
    remove: AddonsRemove
  } = useFieldArray({
    name: 'addon',
    control
  })

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    setloading(true)
    try {
      const res = await CreateProduct({
        ...data,
        category_id: selectedCategory.value,
        subcategory_id: selectedCategory.value
      })
      if (res.status == true) {
        reset()
        dispatch(ApiCalled())
        setloading(false)
        closeModal()
      }
    } catch (error) {
    }
  })

  return (
    <div>
      <div className='flex justify-center w-full'>
        <button
          onClick={() => openModal()}
          className='w-12 h-12 flex justify-center items-center text-4xl text-center bg-white rounded-full'
          style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
        >
          +
        </button>
      </div>

      <Modal modalIsOpen={isOpen} closeModal={closeModal}>
        {loading && <Loader />}
        <form onSubmit={onSubmit} noValidate autoComplete='off'>
          <div className='pt-4'>
            <div className='flex gap-24 items-center mb-8 px-11'>
              <div>
                <Select
                  options={result}
                  value={selectedCategory}
                  setValue={setSelectedCategory}
                  variant='underline'
                  containerClass='!w-[158px] text-sm'
                  labelClass='text-black'
                />
              </div>
              <h2 className='text-xl font-bold'>Product Manager</h2>
              <div className='ml-auto'>
                {/* <button onClick={() => { setIsOpen(false) }} className='text-red-500 font-bold text-sm'>
                  Delete
                </button> */}
              </div>
            </div>

            <div className='h-full'>
              <div className='grid grid-cols-2 gap-20 w-full px-11'>
                <div>
                  <div className='text-[#00C2FF] bg-[#BFEFFF] font-bold text-center py-2 rounded-full mb-5'>
                    English
                  </div>
                  <div>
                    <Input
                      rhf={{
                        control,
                        name: 'title',
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      placeholder={'English Name'}
                      className='!px-0.5 text-xs'
                      {...register('title', {
                        required: { value: true, message: 'Field is Required' }
                      })}
                    />
                    {errors?.title && (
                      <div className='Invalid'>{errors?.title?.message}</div>
                    )}
                  </div>
                  <div className='mt-10 mb-5 w-full'>
                    <TextArea
                      rhf={{
                        control,
                        name: 'description',
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      type='textarea'
                      placeholder={'Description'}
                      className='!px-0.5 text-xs'
                      {...register('description', {
                        required: { value: true, message: 'Field is Required' }
                      })}
                    />
                    {errors?.description && (
                      <div className='Invalid'>
                        {errors?.description?.message}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className='text-[#00C2FF] bg-[#BFEFFF] font-bold text-center py-2 rounded-full mb-5'>
                    Arabic
                  </div>
                  <div>
                    <Input
                      rhf={{
                        control,
                        name: 'title_arab',
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      placeholder={'جراند تشكن سبايسي حار جدا'}
                      className='!px-0.5 text-xs text-rtl'
                      {...register('title_arab', {
                        required: { value: true, message: 'Field is Required' }
                      })}
                    />
                    {errors?.title_arab && (
                      <div className='Invalid'>
                        {errors?.title_arab?.message}
                      </div>
                    )}
                  </div>
                  <div className='mt-10 mb-5 w-full'>
                    <TextArea
                      rhf={{
                        control,
                        name: 'description_arab',
                        variant: 'underline',
                        rules: {
                          required: {
                            value: true,
                            message: 'Field is Required'
                          }
                        }
                      }}
                      type='textarea'
                      placeholder={'وصف المنتج'}
                      className='!px-0.5 text-xs text-rtl'
                      {...register('description_arab', {
                        required: { value: true, message: 'Field is Required' }
                      })}
                    />
                    {errors?.description_arab && (
                      <div className='Invalid'>
                        {errors?.description_arab?.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-center mt-4 px-11'>
                <div className='w-1/2'>
                  <Input
                    rhf={{
                      control,
                      name: 'price',
                      variant: 'underline',
                      rules: {
                        required: { value: true, message: 'Field is Required' }
                      }
                    }}
                    placeholder={'Price 0.000 OMR'}
                    className='!px-0.5 text-lg'
                    {...register('price', {
                      required: { value: true, message: 'Field is Required' }
                    })}
                    type='number'
                  />
                  {errors?.price && (
                    <div className='Invalid'>{errors?.price?.message}</div>
                  )}
                </div>
              </div>

              <div className='flex justify-center mt-4 px-11'>
                <div className='w-1/2'>
                  <Input
                    rhf={{
                      control,
                      name: 'in_stock',
                      variant: 'underline',
                      rules: {
                        required: { value: true, message: 'Field is Required' }
                      }
                    }}
                    placeholder={'Quantity   كمية'}
                    className='!px-0.5 text-lg'
                    {...register('in_stock', {
                      required: { value: true, message: 'Field is Required' }
                    })}
                    type='number'
                  />
                  {errors?.in_stock && (
                    <div className='Invalid'>{errors?.in_stock?.message}</div>
                  )}
                </div>
              </div>
              <Options
                setValue={setValue}
                fields={OptionsField}
                append={OptionsAppend}
                remove={OptionsRemove}
                control={control}
                register={register}
                errors={errors} parameterOptionField={[]} parameterOptionAppend={undefined} parameterOptionRemove={function (index?: number | number[] | undefined): void {
                  throw new Error('Function not implemented.')
                }} />

              <Addons
                fields={AddonsField}
                append={AddonsAppend}
                remove={AddonsRemove}
                control={control}
                register={register}
              />
            </div>
            <div className='w-full px-11'>
              <div className='border-b-1 w-full pt-[1px] bg-[#D3D3D3] my-4'></div>
            </div>
            <div className='grid grid-cols-3 mt-12  border rounded-2xl pb-3 pt-4 relative'>
              <button
                className='text-red-500 text-lg font-bold cursor-pointer'
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <div className='text-[#AFAFAF] text-sm mt-4 absolute left-[20px] bottom-[5px]'>
                Created At {moment(new Date()).format('MMM DD, YYYY HH:MM')}
              </div>

              <ProductImgUploader register={register} name='image' />
              <SaveButton className='mx-auto' type='submit' />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ProductManagerModal
