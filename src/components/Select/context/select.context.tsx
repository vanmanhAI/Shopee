import * as React from 'react'
import useSelect, { SelectOptions } from '@/components/Select/hooks/useSelect'

type ContextType = ReturnType<typeof useSelect> | null

export const SelectContext = React.createContext<ContextType>(null)

export function Select({ children, ...option }: { children: React.ReactNode } & SelectOptions) {
  const select = useSelect(option)

  return <SelectContext.Provider value={select}>{children}</SelectContext.Provider>
}
