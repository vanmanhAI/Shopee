import SelectContent from '@/components/Select/components/SelectContent/SelectContent'
import SelectOption from '@/components/Select/components/SelectOption/SelectOption'
import SelectTrigger from '@/components/Select/components/SelectTrigger/SelectTrigger'
import { Select } from '@/components/Select/context/select.context'
import { useContext, useState } from 'react'
import { DateSelectContext } from '@/components/DateSelect/DateSelect'
import chevronBottom from '@/assets/images/chevron-bottom.svg'
import classNames from 'classnames'

interface Props {
  classNameYearCurrent?: string
  classNameSelectedYear?: string
  classNameYearList?: string
  classNameYearOption?: string
  classNameSelected?: string
  classNameActive?: string
}

const YearSelect = ({
  classNameYearCurrent = 'flex w-[32%] select-none cursor-pointer items-center justify-between border border-black/10 px-[0.9375rem] rounded-sm bg-white truncate text-sm hover:border-orange',
  classNameSelectedYear = 'border-orange',
  classNameYearList = 'bg-white rounded-sm py-[0.3125rem] max-h-[9rem] overflow-y-auto shadow-sm',
  classNameYearOption = 'px-[0.9375rem] py-[0.3125rem] text-sm leading-[1.2]',
  classNameSelected = '',
  classNameActive = 'text-orange'
}: Props) => {
  const { year, setYear } = useContext(DateSelectContext)
  const [showList, setShowList] = useState(false)
  const years = Array.from({ length: 100 }, (_, i) => +year - i)

  const handleOpenChange = (isOpen: boolean) => {
    setShowList(isOpen)
  }

  const handleSelectedYear = (year: string) => {
    setYear(year)
  }

  return (
    <Select isSameLengthAsReference={true}>
      <SelectTrigger onChangeLabel={handleSelectedYear} onOpenChange={handleOpenChange} asChild>
        <div className={`${classNameYearCurrent} ${showList ? classNameSelectedYear : ''}`}>
          <span>{year}</span>
          <img
            src={chevronBottom}
            className={classNames('size-5', {
              'rotate-180': showList
            })}
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        <div>
          <div className={classNameYearList}>
            {years.map((yearCur) => {
              if (yearCur.toString() === year) return null
              return (
                <SelectOption
                  key={yearCur}
                  label={`${yearCur}`}
                  classNameSelected={classNameSelected}
                  classNameActive={classNameActive}
                  asChild
                >
                  <div className={classNameYearOption}>{yearCur}</div>
                </SelectOption>
              )
            })}
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}

export default YearSelect
