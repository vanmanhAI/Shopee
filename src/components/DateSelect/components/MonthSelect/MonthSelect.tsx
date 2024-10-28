import SelectContent from '@/components/Select/components/SelectContent'
import SelectTrigger from '@/components/Select/components/SelectTrigger'
import { Select } from '@/components/Select/context/select.context'
import SelectOption from '@/components/Select/components/SelectOption'
import { DateSelectContext } from '@/components/DateSelect/DateSelect'
import { useContext, useState } from 'react'
import chevronBottom from '@/assets/images/chevron-bottom.svg'
import classNames from 'classnames'

interface Props {
  classNameMonthCurrent?: string
  classNameSelectedMonth?: string
  classNameMonthList?: string
  classNameMonthOption?: string
  classNameSelected?: string
  classNameActive?: string
}

const MonthSelect = ({
  classNameMonthCurrent = 'flex w-[32%] select-none cursor-pointer items-center justify-between border border-black/10 px-[0.9375rem] rounded-sm bg-white truncate text-sm hover:border-orange',
  classNameSelectedMonth = 'border-orange',
  classNameMonthList = 'bg-white rounded-sm py-[0.3125rem] max-h-[9rem] overflow-y-auto shadow-sm',
  classNameMonthOption = 'px-[0.9375rem] py-[0.3125rem] text-sm leading-[1.2]',
  classNameSelected = '',
  classNameActive = 'text-orange'
}: Props) => {
  const { month, setMonth } = useContext(DateSelectContext)
  const [showList, setShowList] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setShowList(isOpen)
  }

  const handleSelectedMonth = (month: string) => {
    setMonth(month)
  }
  return (
    <Select isSameLengthAsReference={true}>
      <SelectTrigger onChangeLabel={handleSelectedMonth} onOpenChange={handleOpenChange} asChild>
        <div className={`${classNameMonthCurrent} ${showList ? classNameSelectedMonth : ''}`}>
          <span>{`Tháng ${month}`}</span>
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
          <div className={classNameMonthList}>
            {Array.from({ length: 12 }, (_, i) => {
              const monthCur = i + 1
              if (monthCur.toString() === month) return null
              return (
                <SelectOption
                  key={monthCur}
                  label={`${monthCur}`}
                  classNameSelected={classNameSelected}
                  classNameActive={classNameActive}
                  asChild
                >
                  <div className={classNameMonthOption}>{`Tháng ${monthCur}`}</div>
                </SelectOption>
              )
            })}
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}

export default MonthSelect
