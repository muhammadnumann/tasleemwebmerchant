/* eslint-disable jsx-a11y/alt-text */
import { ErrorDialog, SuccessDialog } from '@/components/ui/Dailog'
import Input from '@/components/ui/Inputs/Input'
import Modal from '@/components/ui/Modal'
import { DeleteSubCategoryAPi, EditProductSubCategory } from '@/redux/services/Product'
import moment from 'moment'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EditCategory } from './newCategory.interface'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import { useLang } from '@/hooks/useLang'
import ImgUploader from './ManageProfileImgUploader'
import { useDispatch } from 'react-redux'
import { ApiCalled } from '@/redux/store/ApiLoading/ApiLoadingSlice'
import Loader from '@/components/ui/Dailog/loader'

function EditSubCategory({ data, closeModal, setIsOpen, isOpen }: any) {
  const { isEnglish } = useLang()
  const [loading, setloading] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditCategory>({
    mode: 'all',
    defaultValues: {
      id: data.id,
      title: data.title,
      title_ar: data.title_ar,
      image: data.image_path
    }
  })
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data: EditCategory) => {
    try {
      const res = await EditProductSubCategory(data)
      if (res.status === true) {
        setIsOpen(false)
        SuccessDialog(res.message)
        dispatch(ApiCalled())
        setloading(false)
      } else {
        setloading(false)
        ErrorDialog(res)
      }
    } catch (error) {
      setloading(false)
      ErrorDialog(error)
    }
  })
  const DeleteSubCategory = async (data: any) => {
    setloading(true)
    try {
      const res = await DeleteSubCategoryAPi({ id: data.id })
      if (res.status == true) {
        dispatch(ApiCalled())
        closeModal()
      }


      setloading(false)
    } catch (error) {
      setloading(false)
    }
  }

  return (
    <>
      <Modal closeModal={closeModal} modalIsOpen={isOpen}>
        {loading && <Loader />}
        <form onSubmit={onSubmit} noValidate autoComplete='off'>
          <div className='p-10'>
            <div className='relative'>
              <h2 className='text-center text-xl font-bold mb-5'>
                {isEnglish ? 'Sub Category Manager' : 'مدير فئة'}
              </h2>
              <div className='cursor-pointer absolute right-0 top-[-10px]'>
                <span
                  onClick={() => {
                    console.log("numan")
                    DeleteSubCategory({ id: data?.id })
                  }}
                  className='text-red-500 font-bold text-sm'
                >
                  Delete
                </span>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-20 w-full'>
              <div>
                <div className='text-[#00C2FF] bg-[#BFEFFF] text-center py-2 rounded-full mb-5'>
                  {isEnglish ? 'English Name' : 'الاسم الانجليزي'}
                </div>
                <div>
                  <Input
                    rhf={{
                      control,
                      name: 'title',
                      variant: 'underline',
                      rules: {
                        required: { value: true, message: 'Field Is Required' }
                      }
                    }}
                    placeholder={'English Name'}
                    className='!px-0.5 text-xs'
                    {...register('title', {
                      required: { value: true, message: 'Field Is Required' }
                    })}
                  />
                  {errors?.title && (
                    <div className='Invalid'>{errors?.title?.message}</div>
                  )}
                </div>
                <div className='mt-10 mb-5 w-full'>
                  <ImgUploader register={register} name='image' data={data.image_path} />
                </div>
              </div>
              <div>
                <div className='text-[#00C2FF] bg-[#BFEFFF] text-center py-2 rounded-full mb-5'>
                  {isEnglish ? 'Arabic Name' : 'الاسم العربي'}
                </div>
                <Input
                  rhf={{
                    control,
                    name: 'title_ar',
                    variant: 'underline',
                    rules: {
                      required: { value: true, message: 'Field Is Required' }
                    }
                  }}
                  placeholder={'الاسم العربي'}
                  className='!px-0.5 text-xs text-rtl'
                  {...register('title_ar', {
                    required: { value: true, message: 'Field Is Required' }
                  })}
                />
                {errors?.title_ar && (
                  <div className='Invalid'>{errors?.title_ar?.message}</div>
                )}
              </div>
            </div>
            <div className='grid grid-cols-2 gap-20 mt-12'>
              <div>
                <button
                  className='text-red-500 text-lg font-bold cursor-pointer'
                  onClick={() => closeModal()}
                >
                  {isEnglish ? 'Cancel' : 'يلغي'}
                </button>
              </div>
              <SaveButton className='mx-auto' type='submit' />
            </div>
            <div className='text-[#AFAFAF] text-sm mt-4'>
              Created At {moment(new Date(data.date_created)).format('MMM DD, YYYY HH:MM')}
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default EditSubCategory
