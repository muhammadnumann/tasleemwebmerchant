import { useLang } from '@/hooks/useLang'
import {
  FieldValues,
  Path,
  RegisterOptions,

} from 'react-hook-form'

interface ICheckbox<T extends FieldValues> {
  name: Path<T>
  id: string
  rules?: RegisterOptions<T, Path<T>>
  text: string
  value: boolean
  setIsAvailable: any
  textClass?: string
}

const SmallSwitch = <T extends FieldValues>(props: ICheckbox<T>) => {
  const { isEnglish } = useLang()

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer" htmlFor={props.id}>
        <input
          defaultChecked={props?.value}
          type="checkbox" className="sr-only peer" id={props.id}
          onChange={props.setIsAvailable}
        />
        <div className="w-10 h-4 bg-[#9E9E9E] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 after:left-[-5px] after:top-[-1px] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute peer-checked:after:left-[0px] after:bg-white peer-checked:after:bg-[#40D1FF] peer-checked:after:border-[#40D1FF] after:border after:rounded-full after:h-5 after:w-5 after:border-gray-default after:transition-all dark:border-gray-600 peer-checked:bg-[#97E6FF]" />
      </label>
      <span className={`${isEnglish ? "ml-3" : "mr-3"} text-base font-bold text-[#585858] dark:text-gray-300 ${props.textClass}`}>{props.text}</span>
    </div >
  )
}

export default SmallSwitch