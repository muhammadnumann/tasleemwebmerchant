import cn from 'clsx'
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister
} from 'react-hook-form'

interface ICheckbox<T extends FieldValues> {
  label: {
    text: string
    className?: string
  }
  register: UseFormRegister<T>
  name: Path<T>
  id: string
  rules?: RegisterOptions<T, Path<T>>
}

const Checkbox = <T extends FieldValues>(props: ICheckbox<T>) => {
  return (
    <label
      htmlFor={props.id}
      className='cursor-pointer flex gap-2 items-center'
    >
      <input
        {...props.register(props.name, props.rules)}
        type='checkbox'
        id={props.id}
        className='peer sr-only'
      />
      <span className='w-3.5 h-3.5 border border-[#9B9999] text-black text-sm flex justify-center items-center peer-checked:after:content-["✓"]' />
      <div className={cn(props.label.className, 'font-medium text-xs')}>
        {props.label.text}
      </div>
    </label>
  )
}

export default Checkbox
