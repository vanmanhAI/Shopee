import * as React from 'react'
import { SelectContext } from '@/components/Select/context/select.context'

export default function useSelectContext() {
  const context = React.useContext(SelectContext)

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Select />')
  }

  return context
}
