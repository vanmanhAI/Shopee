import { HTMLProps } from 'react'

export const Spinner = ({ className = 'fixed top-0 left-0 w-full h-full' }: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`flex justify-center items-center bg-white ${className}`}>
      <div className='flex justify-center gap-[3px]'>
        <div className='size-2 rounded-full bg-orange animate-bounce1'></div>
        <div className='size-2 rounded-full bg-orange animate-bounce2'></div>
        <div className='size-2 rounded-full bg-orange animate-bounce3'></div>
      </div>
    </div>
  )
}
