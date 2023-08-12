import { useLang } from '@/hooks/useLang'
import { FieldValues, Path } from 'react-hook-form'

interface ICheckbox<T extends FieldValues> {
  name: Path<T>
  id: { id: number, is_stop: boolean }
  text: string
  SetStatus?: any
}

const BIGSwitch = <T extends FieldValues>(props: ICheckbox<T>) => {
  const { isEnglish } = useLang()
  
  return (
    <div className='flex items-center gap-5'>
      <label className="relative inline-flex items-center cursor-pointer" htmlFor={`${props.id.id}`}>
        <input onClick={(e) => {
          props.SetStatus({ e: e, id: props.id.id })
        }}
          type="checkbox" className="sr-only peer" id={`${props.id.id}`}
          defaultChecked={props.id.is_stop}
        />
        <div className="w-11 h-5 bg-[#9E9E9E] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 after:left-[-10px] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[-3px] peer-checked:after:left-[0px] after:bg-white after:border-white peer-checked:after:bg-[#40D1FF] peer-checked:after:border-[#40D1FF] after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-[#97E6FF]" />
      </label>
      <span className={`text-base font-bold text-[#585858] dark:text-gray-300`}>{props.text}</span>
    </div>
  )
}

export default BIGSwitch
