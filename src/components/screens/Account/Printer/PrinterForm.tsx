import React, { FC, useMemo, useState } from 'react'
import { Control, Controller, Path, useForm } from 'react-hook-form'
import IPrinterFormValues from './IPrinterFormValues.interface'
import { useTranslations } from 'next-intl'
import Input from '@/components/ui/Inputs/Input'
import SaveButton from '@/components/ui/Buttons/SaveButton'
import Select from '@/components/ui/Select/Select'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import Loader from '@/components/ui/Dailog/loader'
import SmallSwitch from '@/components/ui/Switch/SmallSwitch'
import { useLang } from '@/hooks/useLang'
import { debounce } from 'lodash';

export const PaperOptions: ISelectItem[] = [
  {
    label: 'A4',
    value: 'A4'
  },
  {
    label: 'A5',
    value: 'A5'
  }
]

interface IPaymentSetupItem {
  title: string
  name: Path<IPrinterFormValues>
  control: Control<IPrinterFormValues, any>
}
interface IRadio extends Omit<IPaymentSetupItem, 'title'> {
  text: string
  index: number
  correctedValue: boolean
}

const Radio: FC<IRadio> = (props) => {
  return (
    <label
      htmlFor={props.name + props.index}
      className='flex cursor-pointer items-center gap-1'
    >
      <Controller
        control={props.control}
        name={props.name}
        render={({ field: { onBlur, onChange, value, ref } }) => {
          return (
            <input
              id={props.name + props.index}
              type='radio'
              className='sr-only peer'
              onBlur={onBlur}
              onChange={() => onChange(props.text)}
              checked={value === props.text}
              ref={ref}
            />
          )
        }}
      />
      <span className='peer relative w-6 h-6 rounded-full border border-[#D9D9D9] peer-checked:after:content-[""] after:hidden peer-checked:after:block after:w-5 after:h-5 after:bg-[#30CDFF] after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' />
      <span>{props.text}</span>
    </label>
  )
}

const PrinterForm = () => {
  const t = useTranslations('Account.Printers')
  const { isEnglish } = useLang()

  const [printerValue, setPrinterValue] = useState(PaperOptions[0].value)
  const { control, handleSubmit, register, formState: { errors } } = useForm<IPrinterFormValues>({ mode: 'all' })

  const [loading, setLoading] = useState(false)


  const onSubmit = handleSubmit(async (data: any) => {
    setLoading(true)
    try {
      // const res = await CreateTaxes(data.taxes)
      // if (res.status === true) setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  })
  const onAutomatically = async (data: any) => {
    // setLoading(true)
    try {
      // const res = await CreateTaxes(data.taxes)
      // if (res.status === true) setLoading(false)
    } catch (error) {
      // setLoading(false)
    }
  }
  const debouncedOnAutomatically = useMemo(
    () => debounce(onAutomatically, 500),
    []
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      autoComplete='off'
      className='mt-8 rounded-xl w-[320px] flex flex-col gap-4 px-3 py-4 mx-auto min-h-[220px] sm:w-[370px]'
    >
      {loading && <Loader />}
      <span className='font-bold text-lg'>{t('slected_printer')}:</span>
      <div className='flex flex-col items-start gap-3 text-sm ml-7'>
        <Radio name='printer' control={control} text={t('printer.0')} index={1} correctedValue={true} />
        <Radio name='printer' control={control} text={t('printer.1')} index={2} correctedValue={false} />
        {/* <Radio name='printer' control={control} text={t('printer.2')} index={3} correctedValue={false} /> */}
      </div>
      {errors?.printer && (
        <div className='Invalid'>{errors?.printer?.message}</div>
      )}
      <div>
        <div className='mt-5'>
          <Input
            rhf={{
              control,
              name: 'serviceId',
              label: { text: t('serviceId') },
              rules: { required: { value: true, message: "Field is Required" } },
            }}
            {...register("serviceId", { required: { value: true, message: "Field is Required" } })}
          />
          {errors?.serviceId && (
            <div className='Invalid'>{errors?.serviceId?.message}</div>
          )}
        </div>
        <div className='mt-5'>
          <Input
            rhf={{
              control,
              name: 'Characteristisc',
              label: { text: t('Characteristisc') },
              rules: { required: { value: true, message: "Field is Required" } },
            }}
            {...register("Characteristisc", { required: { value: true, message: "Field is Required" } })}
          />
          {errors?.Characteristisc && (
            <div className='Invalid'>{errors?.Characteristisc?.message}</div>
          )}
        </div>
        <div className='mt-5'>
          <div className="text-sm px-1.5 mb-[5px]">{t("paper_width")}</div>
          <Select
            options={PaperOptions}
            value={printerValue}
            setValue={setPrinterValue}
            labelClass='!rounded-md'
          />
        </div>
        <div className='text-center mt-8'>
          <SmallSwitch
            id={`printer`}
            name={`printer`}
            text={isEnglish ? 'Print Automatically' : "اطبع تلقائيًا"}
            value={false}
            setIsAvailable={debouncedOnAutomatically}
            textClass="font-normal"
          />
        </div>
        <SaveButton className='mx-auto mt-[140px]' type='submit' />

      </div>
    </form>
  )
}




export default PrinterForm
