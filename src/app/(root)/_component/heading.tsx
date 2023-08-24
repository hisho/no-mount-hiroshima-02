import { cn } from '@/src/util/cn/cn'
import { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Pick<ComponentProps<'h1'>, 'className'>
export const Heading = ({ children, className }: Props) => {
  return (
    <h1 className={cn('text-center text-64 font-bold', className)}>
      {children}
    </h1>
  )
}
