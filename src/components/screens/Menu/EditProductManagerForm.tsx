import React, { useEffect, useState } from 'react'
import { CategoryOptions } from '../Account/OffersManagement/CouponList/coupon-list.data'
import Input from '@/components/ui/Inputs/Input'
import TextArea from '@/components/ui/Inputs/TextArea'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import moment from 'moment'
import { useFieldArray, useForm } from 'react-hook-form'
import Select from '@/components/ui/Select/Select'
import Addons from './Addons'
import { IProdutFormValues } from './IProductAdd.interface'
import { ProductSubCategory } from '@/redux/services/Product'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import ProductImgUploader from './ProductImgUploader'
import { DeleteProductHandler, EditProductHandler } from '@/redux/services/addons'
import Options from './Options'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'
import Loader from '@/components/ui/Dailog/loader'
import Exclude from './Exclude'
import { useLang } from '@/hooks/useLang'

interface Ivalue {
  data: any
  seteditisOpen: any
  closeModal: any
}
function EditProductManagerForm({ data, seteditisOpen, closeModal }: Ivalue) {
  const [selectedCategory, setSelectedCategory] = useState(CategoryOptions[0])
  const [loading, setloading] = useState(false)
  const { isEnglish } = useLang()

  const [result, setResult] = useState<ISelectItem[]>([
    { label: 'Select Category', value: 0 }
  ])

  const CategoryList = async () => {
    try {
      const res = await ProductSubCategory()
      setResult(
        res.data.map((v: any) => {
          return { label: isEnglish ? v.title : v.title_ar, value: v?.id }
        })
      )
    } catch (error) { }
  }

  useEffect(() => {
    CategoryList()
  }, [])

  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors }
  } = useForm<IProdutFormValues>({
    mode: 'all',
    defaultValues: {
      id: data.id,
      title: data.title,
      title_arab: data.title_arab,
      description: data.description,
      description_arab: data.description_arab,
      rate: data.rate,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id,
      favorites: data.favorites,
      price: data.price,
      discount_percentage: data.discount_percentage,
      currency: data.currency,
      in_stock: data.in_stock,

      addon: data.add_ons.map((val: any) => {
        return {
          product_id: val.product_id,
          id: val.id,
          title: val.title,
          title_arab: val.title_arab,
          description: val.description,
          description_arab: val.description_arab,
          price: val.price,
          isNew: 0
        }
      }),

      Parameter: data.options.map((val: any) => {
        return {
          product_id: val.option.product_id,
          id: val.option.id,
          title: val.option.title,
          title_arab: val.option.title_arab,
          ParameterOptions: val.parameter_options.map((optionVal: any) => {
            return {
              title: optionVal.title,
              title_arab: optionVal.title_arab,
              price: optionVal.price
            }
          })
        }
      }),
      // exclude: data?.exclude.map((val: any) => {
      //   return {
      //     product_id: val.product_id,
      //     id: val.id,
      //     title: val.title,
      //     title_arab: val.title_arab,
      //     description: val.description,
      //     description_arab: val.description_arab,
      //     price: val.price,
      //     isNew: 0
      //   }
      // }),

    }
  })

  const DeleteProduct = async (id: any) => {
    setloading(true)
    try {
      const res: any = await DeleteProductHandler({ id: id })
      if (res.status == true) {
        dispatch(ApiCalled())
        setloading(false)
        closeModal()
      }
    } catch (error) {
      setloading(false)

    }
  }
  const {
    fields: OptionsField,
    append: OptionsAppend,
    remove: OptionsRemove
  } = useFieldArray({
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
  const {
    fields: ExcludeField,
    append: ExcludeAppend,
    remove: ExcludeRemove
  } = useFieldArray({
    name: 'exclude',
    control
  })
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    setloading(true)
    try {
      const res = await EditProductHandler(data)
      if (res.status == true) {
        dispatch(ApiCalled())
        closeModal()
      }
      setloading(false)
    } catch (error) {
      setloading(false)
    }
  })

  return (
    <>
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
            <h2 className='text-xl font-bold'>{isEnglish ? 'Product Manager' : 'مدير الإنتاج'}</h2>
            <div className='ml-auto'>
              <span
                onClick={() => {
                  DeleteProduct(data?.id)
                }}
                className='text-red-500 font-bold text-sm cursor-pointer'
              >
                {isEnglish ? 'Delete' : 'يمسح'}
              </span>
            </div>
          </div>

          <div className='h-full'>
            <div className='grid grid-cols-2 gap-20 w-full px-11'>
              <div>
                <div className='text-[#00C2FF] bg-[#BFEFFF] font-bold text-center py-2 rounded-full mb-5'>
                  {isEnglish ? 'English' : 'إنجليزي'}
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
                    placeholder={isEnglish ? 'English Name' : 'الاسم الانجليزي'}
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
                    placeholder={isEnglish ? 'Description' : 'وصف'}
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
                  {isEnglish ? 'Arabic' : 'عربي'}
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
                    <div className='Invalid'>{errors?.title_arab?.message}</div>
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
                  placeholder={isEnglish ? 'Price 0.000 OMR' : 'السعر 0.000 ريال عماني'}
                  className='!px-0.5 text-lg'
                  {...register('price', {
                    required: { value: true, message: 'Field is Required' }
                  })}
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
              errors={errors}
              parameterOptionField={[]}
              parameterOptionAppend={undefined}
              parameterOptionRemove={function (
                index?: number | number[] | undefined
              ): void {
                throw new Error('Function not implemented.')
              }}
            />

            <Addons
              productId={data.id}
              fields={AddonsField}
              append={AddonsAppend}
              remove={AddonsRemove}
              control={control}
            />
            <Exclude
              fields={ExcludeField}
              append={ExcludeAppend}
              remove={ExcludeRemove}
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
              {isEnglish ? 'Cancel' : 'يلغي'}
            </button>
            <div className='text-[#AFAFAF] text-sm mt-4 absolute left-[20px] bottom-[5px]'>
              {isEnglish ? 'Created At' : 'أنشئت في'} {moment(new Date()).format('MMM DD, YYYY HH:MM')}
            </div>
            <ProductImgUploader register={register} name='image' />
            <SaveButton className='mx-auto' type='submit' />
          </div>
        </div>
      </form>
    </>
  )
}

export default EditProductManagerForm
