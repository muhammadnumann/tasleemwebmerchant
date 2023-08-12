'use client'

import SaveButton from '@/components/ui/Buttons/SaveButton'
import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { FC, useState } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'
import { accountMenuItems } from '../AccountMenu/account-menu.data'
import AccountTabTitle from '../AccountTabTitle'
import ManageProfileImgUploader from './ManageProfileImgUploader'
import { manageProfileInputs } from './manage-profile.data'
import { IManageProfileFormValues } from './manage-profile.interface'
import { EditManageProfile } from '@/redux/services/Account'
import { useDispatch } from 'react-redux'
import { ManageProfile } from '@/redux/store/Account/AccountReducer'
import { getLocalStorage } from '@/redux/store/Auth/AuthActions'
import Loader from '@/components/ui/Dailog/loader'

const ManageProfileForm = () => {
  const t = useTranslations('Account.ManageProfile')
  const [loading, setLoading] = useState(false)
  const userData = getLocalStorage('userData')
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<any>({
    mode: 'all',
    defaultValues: {
      company_name: userData.userRetailer.company_name || '',
      company_name_arab: userData.userRetailer.company_name_arab || '',
      description: userData.userRetailer.description || '',
      description_arab: userData.userRetailer.description_arab || '',
      mobile_number: userData.userRetailer.mobile_number || '',
      image_path: userData.userRetailer.image_path || '',
    }
  })

  const registerArr = [
    {
      ...register('company_name', {
        required: { value: true, message: 'Field is Required' }
      })
    },
    {
      ...register('company_name_arab', {
        required: { value: true, message: 'Field is Required' }
      })
    },
    {
      ...register('description', {
        required: { value: true, message: 'Field is Required' }
      })
    },
    {
      ...register('description_arab', {
        required: { value: true, message: 'Field is Required' }
      })
    },
    {
      ...register('mobile_number', {
        required: { value: true, message: 'Field is Required' }
      })
    },
  ]
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const response = await EditManageProfile(data)
      dispatch(ManageProfile(response.data))
      if (response.status == true) {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate autoComplete='off'>
      <AccountTabTitle {...accountMenuItems[0]} />
      <ul className='flex flex-col gap-[18px] mt-8'>
        {manageProfileInputs.map(({ name, placeholder }, i) => {
          return (
            <>
              <div>
                <Input
                  key={name}
                  rhf={{
                    control,
                    name,
                    variant: 'underline',
                    containerClass: 'mx-auto w-full max-w-[276px]'
                    // rules: { required: true }
                  }}
                  placeholder={t(placeholder)}
                  className='text-center'
                  {...registerArr[i]}
                />
                {errors[name] && (
                  <div className='Invalid mx-auto w-full max-w-[276px]'>{`${errors[name]?.message}`}</div>
                )}
              </div>
            </>
          )
        })}
      </ul>
      {loading && <Loader />}
      <Uploaders register={register} />
      <SaveButton className='mx-auto mt-10' type='submit' />
    </form>
  )
}

const Uploaders: FC<{
  register: UseFormRegister<IManageProfileFormValues>
}> = ({ register }) => {
  const t = useTranslations('Account.ManageProfile')
  const userData = getLocalStorage('userData')
  const logo = userData.userRetailer.image_path || ''
  let banner_image_path = userData.userRetailer.banner_image_path || ''
  let banner_thumb_image_path = userData.userRetailer.banner_thumb_image_path || ''

  banner_image_path = banner_image_path.replace("/home/tslcpanel/public_html/", '')
  banner_image_path = 'https://tasleem.in/' + banner_image_path;
  banner_thumb_image_path = banner_thumb_image_path.replace("/home/tslcpanel/public_html/", '')
  banner_thumb_image_path = 'https://tasleem.in/' + banner_thumb_image_path;

  return (
    <div className='flex gap-5 justify-center mt-7'>
      <ManageProfileImgUploader
        type='logo'
        register={register}
        name='image_path'
        title={t('app-logo')}
        path={logo}
      />
      <div className='flex flex-col gap-0.5'>
        <ManageProfileImgUploader
          type='banner'
          register={register}
          name='feature_banner_path'
          title={t('app-banner')}
          path={banner_thumb_image_path}
        />
        <ManageProfileImgUploader
          type='banner'
          register={register}
          name='banner_image_path'
          title={t('list-banner')}
          path={banner_image_path}
        />
      </div>
    </div>
  )
}

export default ManageProfileForm
