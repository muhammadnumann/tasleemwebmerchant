/* eslint-disable react-hooks/exhaustive-deps */
import SaveButton from '@/components/ui/Buttons/SaveButton'
import { useFieldArray, useForm } from 'react-hook-form'
import { AiOutlinePlus } from 'react-icons/ai'
import { ITaxesFormValues } from '../taxes.inteface'
import TaxesFormItem from './TaxesFormItem'
import {
  CreateTaxes,
  DeleteTaxApi,
  ProductTaxListingApi
} from '@/redux/services/Account'
import { useEffect, useState } from 'react'
import Loader from '@/components/ui/Dailog/loader'

const TaxesForm = () => {

  const getTaxList = async () => {
    const res = await ProductTaxListingApi()
    const result1 = res?.data.map((d: any) => ({
      title: d.title,
      title_ar: d.title_ar,
      value: d.value,
      tid: d.id
    }))
    append(result1)
  }
  useEffect(() => {
    getTaxList()
  }, [])

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ITaxesFormValues>({
    mode: 'all',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'taxes',
    control
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const res = await CreateTaxes(data.taxes)
      if (res.status === true) setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  })

  const addTax = () => {
    append(
      { title: '', title_ar: '', value: '', id: -1, tid: 0 },
      { shouldFocus: true }
    )
  }
  const handleRemove = async (index: number) => {
    setLoading(true)
    if (fields[index].tid == 0) {
      remove(index)
      setLoading(false)
    } else {
      var res = await DeleteTaxApi(fields[index])
      remove(index)
      setLoading(false)
    }

  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete='off'
        className='border border-gray-default mt-8 rounded-xl w-[320px] flex flex-col gap-4 px-3 py-4 mx-auto min-h-[220px] sm:w-[370px]'
      >
        {loading && <Loader />}
        {fields.map((f, i) => (
          <TaxesFormItem
            key={f.id}
            index={i}
            control={control}
            remove={handleRemove}
            register={register}
            errors={errors}
          />
        ))}
        <div className='flex justify-center mt-4'>
          <div
            className='cursor-pointer rounded-full shadow-default bg-white p-2'
            onClick={addTax}
          >
            <AiOutlinePlus size={24} />
          </div>
        </div>
        <SaveButton className='ml-auto mt-auto' type='submit' />
      </form>
      {loading && <Loader />}
    </>
  )
}

export default TaxesForm
