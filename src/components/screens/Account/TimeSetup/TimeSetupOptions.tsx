import Select from '@/components/ui/Select/Select'
import { ISelectItem } from '@/components/ui/Select/select.interface'
import { Dispatch, FC, SetStateAction } from 'react'
import { allTimezones, useTimezoneSelect } from 'react-timezone-select'

interface ITimeSetupOptions {
  timezone: string
  timeType: ISelectItem
  setTimeType: Dispatch<SetStateAction<ISelectItem>>
  setTimezone: Dispatch<SetStateAction<string>>
}


const TimeSetupOptions: FC<ITimeSetupOptions> = (props) => {
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: 'original',
    timezones: allTimezones
  })

  return (
    <div className='mt-5 flex gap-5 justify-between flex-col md:flex-row'>
      <Select
        options={options}
        value={parseTimezone(props.timezone)}
        setValue={(v) => props.setTimezone(v.value)}
        containerClass='w-full text-sm md:w-[145px]'
      />
      <Select
        options={[
          { label: '24 hr', value: 24 },
          { label: '12 hr', value: 12 }
        ]}
        value={props.timeType}
        setValue={(v) => props.setTimeType(v)}
        containerClass='w-full text-sm md:w-[145px]'
      />
    </div>
  )
}

export default TimeSetupOptions
