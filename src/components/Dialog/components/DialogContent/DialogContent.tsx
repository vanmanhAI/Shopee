import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useMergeRefs } from '@floating-ui/react'
import * as React from 'react'
import useDialogContext from '@/components/Dialog/hooks/useDialogContext'

interface DialogContentProps {
  classNameOverlay?: string
}

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & DialogContentProps>(
  function DialogContent({ classNameOverlay = 'bg-[#00000024] z-20 grid place-items-center px-10', ...rest }, propRef) {
    const { context: floatingContext, isLockScroll, disableFocusManagement, ...context } = useDialogContext()
    const ref = useMergeRefs([context.refs.setFloating, propRef])

    if (!floatingContext.open) return null

    return (
      <FloatingPortal>
        <FloatingOverlay className={classNameOverlay} lockScroll={isLockScroll}>
          <FloatingFocusManager context={floatingContext} initialFocus={-1} disabled={disableFocusManagement}>
            <div
              ref={ref}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(rest)}
            >
              {rest.children}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    )
  }
)
