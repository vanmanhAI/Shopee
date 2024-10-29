import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

interface IDateSelectContext {
  day: string
  setDay: React.Dispatch<React.SetStateAction<string>>
  month: string
  setMonth: React.Dispatch<React.SetStateAction<string>>
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
}

const initialDateSelectContext: IDateSelectContext = {
  day: new Date().getDate().toString(),
  setDay: () => null,
  month: new Date().getMonth().toString(),
  setMonth: () => null,
  year: new Date().getFullYear().toString(),
  setYear: () => null
}

export const DateSelectContext = createContext<IDateSelectContext>(initialDateSelectContext)

const DateSelect = ({ children }: { children: React.ReactNode }) => {
  const [day, setDay] = useState<string>(initialDateSelectContext.day)
  const [month, setMonth] = useState<string>(initialDateSelectContext.month)
  const [year, setYear] = useState<string>(initialDateSelectContext.year)

  useEffect(() => {
    console.log('day', day)
    console.log('month', month)
    console.log('year', year)
  }, [day, month, year])

  return (
    <DateSelectContext.Provider value={{ day, setDay, month, setMonth, year, setYear }}>
      {children}
    </DateSelectContext.Provider>
  )
}

export default DateSelect
