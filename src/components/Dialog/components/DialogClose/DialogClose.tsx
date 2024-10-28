import * as React from 'react'
import useDialogContext from '@/components/Dialog/hooks/useDialogContext'

export const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DialogClose(props, ref) {
    const { setOpen } = useDialogContext()
    return <button type='button' {...props} ref={ref} onClick={() => setOpen(false)} />
  }
)
