'use client'

import { ReactNode, useSyncExternalStore } from 'react'

const getSnapshot = () => {
  return window.innerWidth
}

const subscribe = (callback: (e: UIEvent) => void) => {
  window.addEventListener('resize', callback)
  return () => window.removeEventListener('resize', callback)
}

type Props = {
  children: ReactNode
}

export default function ({ children }: Props) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, ()=> 1)

  return (
    <div
      className={
        'relative flex h-[100svh] w-full items-center justify-center bg-gray-700'
      }
    >
      <div
        className={'absolute left-1/2 top-1/2 aspect-video w-[1000px]'}
        style={{ transform: `translate(-50%, -50%) scale(${snapshot / 1000})` }}
      >
        {children}
      </div>
    </div>
  )
}
