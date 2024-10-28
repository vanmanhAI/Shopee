import * as React from 'react'
import { DialogContext } from '@/components/Dialog/context/dialog.context'

export default function useDialogContext() {
  const context = React.useContext(DialogContext)

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />')
  }

  return context
}
