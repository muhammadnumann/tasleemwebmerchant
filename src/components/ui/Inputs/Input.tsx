import cn from 'clsx'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions
} from 'react-hook-form'
import InputsLabel from './InputsLabel'

interface IInput<T extends FieldValues>
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  rhf: {
    control: Control<T>
    name: Path<T>
    label?: {
      text?: string
      className?: string
    }
    rules?: Omit<
      RegisterOptions<T, Path<T>>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
    containerClass?: string
    variant?: 'default' | 'underline'
  }
}

const Input = <T extends FieldValues>({ rhf, ...props }: IInput<T>) => {
  return (
    <Controller
      control={rhf.control}
      name={rhf.name}
      render={({ field }) => (
        <div className={rhf.containerClass}>
          <InputsLabel className={rhf.label?.className}>
            {rhf.label?.text}
          </InputsLabel>
          <input
            {...props}
            {...field}
            className={cn(
              props.className,
              'h-10 w-full px-2',
              rhf.variant === 'underline'
                ? 'border-b border-b-black h-8 outline-none'
                : 'border rounded-md border-gray-default sm:h-11 md:h-12',
              {
                'mt-[5px]': !!rhf.label
              }
            )}
          />
        </div>
      )}
      rules={rhf.rules}
    />
  )
}

export default Input
