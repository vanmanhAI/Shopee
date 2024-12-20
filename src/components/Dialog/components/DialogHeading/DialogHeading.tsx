import { useId } from '@floating-ui/react'
import * as React from 'react'
import useDialogContext from '@/components/Dialog/hooks/useDialogContext'

export const DialogHeading = React.forwardRef<HTMLHeadingElement, React.HTMLProps<HTMLHeadingElement>>(
  function DialogHeading({ children, ...props }, ref) {
    const { setLabelId } = useDialogContext()
    const id = useId()

    // Only sets `aria-labelledby` on the Dialog root element
    // if this component is mounted inside it.
    React.useLayoutEffect(() => {
      setLabelId(id)
      return () => setLabelId(undefined)
    }, [id, setLabelId])

    return (
      <h2 {...props} ref={ref} id={id}>
        {children}
      </h2>
    )
  }
)
