'use client'

import Input from '@/components/ui/Inputs/Input'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import LoginFormButton from './LoginFormButton'
import { useDispatch } from 'react-redux'
import { AuthLogin } from '@/redux/store/Auth/AuthReducer'
import { UserLogin } from '@/redux/services/Auth'
import { ErrorDialog } from '@/components/ui/Dailog'
import Loader from '@/components/ui/Dailog/loader'
import { useState } from 'react'

interface IFormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const t = useTranslations('Login')
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormValues>({ mode: 'all' })
  const dispatch = useDispatch()

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    const response = await UserLogin(data)
    if (response.status == false) {
      ErrorDialog(response.error?.password[0])
      setLoading(false)
    } else {
      setLoading(false)
      dispatch(AuthLogin({ payload: response }))
      window.location.href = `/`
    }
  })

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}
      className='self-start w-full'
    >
      {loading && <Loader />}

      <div className='flex flex-col gap-3.5'>
        <div className='mx-auto w-full max-w-[280px] sm:max-w-[367px]'>
          <Input
            rhf={{
              control,
              name: 'email',
              label: { text: t('email'), className: 'text-[#7B7878]' },
              rules: { required: true },
              containerClass: `mx-auto w-full max-w-[280px] sm:max-w-[367px]`
            }}
            {...register('email', {
              required: { value: true, message: 'Field is Required' },
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email Format' }
            })}
          />
          {errors?.email && (
            <div className='Invalid'>{errors?.email?.message}</div>
          )}
          <Input
            rhf={{
              control,
              name: 'password',
              label: { text: t('password'), className: 'text-[#7B7878]' },
              rules: { required: true },
              containerClass: 'mx-auto w-full max-w-[280px] sm:max-w-[367px]'
            }}
            type='password'
            placeholder='Password'
            {...register('password', {
              required: { value: true, message: 'Field is Required' },
              minLength: { value: 6, message: 'Minimum 6 Character Long' }
            })}
          />
          {errors?.password && (
            <div className='Invalid'>{errors?.password?.message}</div>
          )}
        </div>
      </div>
      <LoginFormButton />
    </form>
  )
}

export default LoginForm
