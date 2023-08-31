import { cn } from '@/util/cn/cn'
import { ComponentProps } from 'react'

type Props = {
  imageSrc: string
} & Pick<ComponentProps<'div'>, 'children' | 'className'>

export const Presenter = ({ children, className, imageSrc }: Props) => {
  return (
    <div className={cn('grid grid-cols-2', className)}>
      <div className={'flex items-center justify-center'}>
        <div className={'relative aspect-square w-[80%]'}>
          <img
            className={
              'absolute inset-0 h-full w-full rounded-full border-8 border-green-600 object-cover object-center'
            }
            alt={''}
            src={imageSrc}
          />
        </div>
      </div>
      <div className={'flex flex-col py-10'}>{children}</div>
    </div>
  )
}
