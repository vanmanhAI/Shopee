import classNames from 'classnames'

interface Props {
  className?: string
  classNameInput?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputCheckbox({
  className = 'min-w-[3.625rem] pl-5 pr-3',
  classNameInput = 'size-4 mr-2 rounded-sm',
  checked = false,
  onChange
}: Props) {
  return (
    <div className={className}>
      <label className='relative text-xs text-black/55 cursor-default font-light flex items-center'>
        <input
          type='checkbox'
          role='checkbox'
          className='absolute top-0 left-0 opacity-0'
          checked={checked}
          onChange={onChange}
        />
        <div
          className={classNames(
            `box-content relative select-none  border  flex-shrink-0 shadow-sm before:block before:absolute before:border-l-2 before:border-b-2 before:border-white before:w-[0.5625rem] before:h-[0.3125rem] before:top-[0.1875rem] before:left-[0.1875rem] before:-rotate-45 before:box-content ${classNameInput}`,
            {
              'bg-orange border-orange': checked,
              'border-black/15': !checked
            }
          )}
        ></div>
      </label>
    </div>
  )
}
