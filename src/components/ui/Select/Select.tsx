import { useOutside } from '@/hooks/useOutside'
import cn from 'clsx'
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { ISelectItem } from './select.interface'

interface ISelect {
  options: ISelectItem[]
  value: ISelectItem
  setValue: (v: ISelectItem) => void
  variant?: 'default' | 'underline'
  containerClass?: string
  labelClass?: string
}

const Select: FC<ISelect> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutside(ref, () => setIsOpen(false))

  return (
    <div
      ref={ref}
      dir='ltr'
      className={cn(props.containerClass, 'relative w-full')}
    >
      <Label
        label={props.value.label}
        variant={props.variant}
        setIsOpen={setIsOpen}
        labelClass={props.labelClass}
      />
      {isOpen && <Items {...props} setIsOpen={setIsOpen} />}
    </div>
  )
}

interface ILabel {
  label: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
  variant?: 'default' | 'underline'
  labelClass?: string
}

const Label: FC<ILabel> = (props) => {
  return (
    <div
      onClick={() => props.setIsOpen((v) => !v)}
      className={cn(
        props.labelClass,
        'relative w-full flex items-center cursor-pointer px-3 py-0.5 bg-white',
        props.variant === 'underline'
          ? 'border-b border-b-black h-8 outline-none'
          : 'border rounded-xl border-gray-default h-11'
      )}
    >
      <span className='overflow-hidden whitespace-nowrap text-ellipsis w-[90%]'>
        {props.label}
      </span>
      <BiSolidDownArrow
        size={12}
        color='#4D4D4D'
        className='absolute right-3 top-1/2 -translate-y-1/2'
      />
    </div>
  )
}

interface IItems extends ISelect {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const Items: FC<IItems> = (props) => {
  return (
    <div
      className={cn(
        'absolute z-50 bg-white border border-gray-default w-full left-0 overflow-y-auto max-h-[200px]',
        props.variant === 'underline'
          ? 'top-[34px] rounded'
          : 'rounded-xl top-[46px]'
      )}
    >
      {props.options.map((o) => (
        <div
          key={o.value}
          className={cn('p-2 hover:bg-gray-50 duration-300 cursor-pointer', {
            'bg-gray-100 font-medium': props.value.value === o.value
          })}
          onClick={() => {
            props.setValue(o)
            props.setIsOpen(false)
          }}
        >
          {o.label}
        </div>
      ))}
    </div>
  )
}

export default Select
