'use client'

import { accountMenuItems } from '@/components/screens/Account/AccountMenu/account-menu.data'
import AccountTabTitle from '@/components/screens/Account/AccountTabTitle'
import TimeSetupDays from '@/components/screens/Account/TimeSetup/TimeSetupDays'
import TimeSetupOptions from '@/components/screens/Account/TimeSetup/TimeSetupOptions'
import {
  ITimeSetupFormValues,
  WeekFormat
} from '@/components/screens/Account/TimeSetup/time-setup.interface'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import Loader from '@/components/ui/Dailog/loader'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import { UpdateTimeSetup } from '@/redux/services/Account'
import { ManageProfile } from '@/redux/store/Account/AccountReducer'
import { getLocalStorage } from '@/redux/store/Auth/AuthActions'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const TimeSetupscreen = () => {
  const data = getLocalStorage("userData").userRetailer
  const timeSetupBaseDays = [
    {
      from: data.sat_start,
      to: data.sat_end,
    },
    {
      from: data.sun_start,
      to: data.sun_end,
    },
    {
      from: data.mon_start,
      to: data.mon_end,
    },
    {
      from: data.tue_start,
      to: data.tue_end,
    },
    {
      from: data.wed_start,
      to: data.wed_end,
    },
    {
      from: data.thu_start,
      to: data.thu_end,
    },
    {
      from: data.fri_start,
      to: data.fri_end,
    }
  ]
  const t = useTranslations('Account.TimeSetup')
  const defaultTimeZone = data.store_timezone || 'Asia/Karachi';
  const dateTimeFormat = new Intl.DateTimeFormat(undefined, { timeZone: defaultTimeZone });
  const resolvedTimeZone = dateTimeFormat.resolvedOptions().timeZone;

  const [timezone, setTimezone] = useState(resolvedTimeZone)
  const [loading, setLoading] = useState(false)

  const [timeType, setTimeType] = useState<ISelectItem>({
    label: '24 hr',
    value: 24
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ITimeSetupFormValues>({
    mode: 'all',
    defaultValues: {
      days: timeSetupBaseDays
    }
  })
  const { fields, replace } = useFieldArray({
    control,
    name: 'days'
  })

  const dispatch = useDispatch()
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const res = await UpdateTimeSetup({ ...data, store_timezone: timezone })
      if (res.status === true) {
        dispatch(ManageProfile(res.data))
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  })

  const applyForAll = () => {
    const { from, to } = getValues('days')[0]
    const data = fields.map(({ id }) => ({ id, from, to }))
    replace(data)
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete='off'
        className='w-[70%] mx-auto md:w-1/2'
      >
        <AccountTabTitle {...accountMenuItems[3]} />
        <TimeSetupOptions
          timezone={timezone}
          timeType={timeType}
          setTimezone={setTimezone}
          setTimeType={setTimeType}
        />
        <div className='flex mt-5'>
          <TimeSetupDays control={control} fields={fields} errors={errors} />
          <div className='flex-1 flex items-end flex-col justify-between pb-1.5 pt-8 sm:pt-9 sm:pb-3 min-w-[80px]'>
            <div
              onClick={applyForAll}
              className='cursor-pointer font-medium text-xs text-[#30CDFF]'
            >
              {t('apply-for-all')}
            </div>
            <div onClick={onSubmit}>
              <SaveButton className='mt-auto !w-auto' type='button' />
            </div>
          </div>
        </div>
      </form>
      {loading && <Loader />}
    </>
  )
}

export default TimeSetupscreen
