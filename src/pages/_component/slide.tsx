import { cn } from '@/util/cn/cn'
import { ComponentProps, ReactNode } from 'react'

type Props = {
  center?: boolean
  children: ReactNode
} & Pick<ComponentProps<'div'>, 'className'>

export const Slide = ({ center = false, children, className }: Props) => {
  const centerClass = 'flex justify-center items-center'

  return (
    <div
      className={cn(
        'grid h-full bg-gray-800 p-8',
        center && centerClass,
        className
      )}
    >
      {children}
    </div>
  )
}
