import * as React from 'react'
import useDialog, { DialogOptions } from '@/components/Dialog/hooks/useDialog'

type ContextType =
  | (ReturnType<typeof useDialog> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>
    })
  | null

export const DialogContext = React.createContext<ContextType>(null)

export function Dialog({
  children,
  ...options
}: {
  children: React.ReactNode
} & DialogOptions) {
  const dialog = useDialog(options)
  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
}
