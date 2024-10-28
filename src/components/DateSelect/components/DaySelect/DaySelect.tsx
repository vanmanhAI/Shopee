import { useContext, useState } from 'react'
import SelectContent from '@/components/Select/components/SelectContent/SelectContent'
import SelectOption from '@/components/Select/components/SelectOption/SelectOption'
import SelectTrigger from '@/components/Select/components/SelectTrigger/SelectTrigger'
import { Select } from '@/components/Select/context/select.context'
import { DateSelectContext } from '@/components/DateSelect/DateSelect'
import chevronBottom from '@/assets/images/chevron-bottom.svg'
import classNames from 'classnames'

interface Props {
  classNameDayCurrent?: string
  classNameSelectedDay?: string
  classNameDayList?: string
  classNameDayOption?: string
  classNameSelectedOption?: string
  classNameActiveOption?: string
}

const DaySelect = ({
  classNameDayCurrent = 'flex w-[32%] select-none cursor-pointer items-center justify-between border border-black/10 px-[0.9375rem] rounded-sm bg-white truncate text-sm hover:border-orange',
  classNameSelectedDay = 'border-orange',
  classNameDayList = 'bg-white rounded-sm py-[0.3125rem] max-h-[9rem] overflow-y-auto shadow-sm',
  classNameDayOption = 'px-[0.9375rem] py-[0.3125rem] text-sm leading-[1.2]',
  classNameSelectedOption = '',
  classNameActiveOption = 'text-orange'
}: Props) => {
  const { setDay, day, month, year } = useContext(DateSelectContext)
  const [showList, setShowList] = useState(false)

  const handleOpenChange = (isOpen: boolean) => {
    setShowList(isOpen)
  }

  const handleSelectedDay = (day: string) => {
    setDay(day)
  }

  const daysInMonth = new Date(+(year as string), +(month as string), 0).getDate()

  return (
    <Select isSameLengthAsReference={true}>
      <SelectTrigger onChangeLabel={handleSelectedDay} onOpenChange={handleOpenChange} asChild>
        <div
          className={classNames(`${classNameDayCurrent}`, {
            [classNameSelectedDay]: showList
          })}
        >
          <span>{day}</span>
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
          <div className={classNameDayList}>
            {Array.from({ length: daysInMonth }, (_, i) => {
              const dayCur = i + 1
              if (dayCur.toString() === day) return null
              return (
                <SelectOption
                  key={dayCur}
                  label={`${dayCur}`}
                  classNameSelected={classNameSelectedOption}
                  classNameActive={classNameActiveOption}
                  asChild
                >
                  <div className={classNameDayOption}>{dayCur}</div>
                </SelectOption>
              )
            })}
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}

export default DaySelect
