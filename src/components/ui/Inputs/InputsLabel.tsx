import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface IInputsLabel {
  className?: string
}

const InputsLabel: FC<PropsWithChildren<IInputsLabel>> = ({
  children,
  className
}) => {
  return children ? (
    <div className={cn(className, 'text-sm px-1.5')}>{children}</div>
  ) : null
}

export default InputsLabel
