import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react'
import * as React from 'react'

export interface DialogOptions {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isLockScroll?: boolean
  closeByEscapeOrClickOutside?: boolean
  disableFocusManagement?: boolean
}

export default function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  isLockScroll = true,
  closeByEscapeOrClickOutside = true,
  disableFocusManagement = false
}: DialogOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen)
  const [labelId, setLabelId] = React.useState<string | undefined>()
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen
  /**
   * Quản lý vị trí của dialog (floating element)
   */
  const data = useFloating({
    open,
    onOpenChange: setOpen
  })

  const context = data.context

  /**
   * Quản lý các tương tác và cải thiện khả năng tương tác (useRole) của user với dialog
   *
   */

  const click = useClick(context, {
    enabled: controlledOpen == null
  })
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown', enabled: closeByEscapeOrClickOutside })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...data,
      ...interactions,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      disableFocusManagement,
      isLockScroll
    }),
    [open, setOpen, interactions, data, labelId, descriptionId, isLockScroll, disableFocusManagement]
  )
}
