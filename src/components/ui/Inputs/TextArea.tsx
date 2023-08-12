import cn from 'clsx'
import {
  Controller
} from 'react-hook-form'
import InputsLabel from './InputsLabel'

const TextArea = ({ rhf, ...props }: any) => {
  return (
    <Controller
      control={rhf.control}
      name={rhf.name}
      render={({ field }) => {
        return (<div className={rhf.containerClass}>
          <InputsLabel className={rhf.label?.className}>
            {rhf.label?.text}
          </InputsLabel>
          <textarea
            rows="4" cols="50"
            {...props}
            {...field}
            className={cn(
              props.className,
              'w-full px-2',
              rhf.variant === 'underline'
                ? 'border border-black rounded-md p-2 outline-none'
                : 'border rounded-md border-gray-default sm:h-11 md:h-12',
              {
                'mt-[5px]': !!rhf.label
              }
            )}
          />
        </div>
        )
      }}
      rules={rhf.rules}
    />
  )
}

export default TextArea
