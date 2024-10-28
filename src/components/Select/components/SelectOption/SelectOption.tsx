import { useListItem, useMergeRefs } from '@floating-ui/react'
import { cloneElement, forwardRef, isValidElement, useMemo } from 'react'
import classNames from 'classnames'
import useSelectContext from '@/components/Select/hooks/useSelectContext'

interface SelectOptionsProps {
  children: React.ReactNode
  asChild?: boolean
  classNameActive: string
  classNameSelected: string
  label: string
}

const SelectOption = forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & SelectOptionsProps>(function SelectOption(
  { children, asChild = false, className, classNameActive, classNameSelected, label, ...props },
  propRef
) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelectContext()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref
  const { ref: refListItem, index } = useListItem({ label })
  const ref = useMergeRefs([propRef, childrenRef, refListItem])

  const isActive = activeIndex === index
  const isSelected = selectedIndex === index

  const listItemProps = useMemo(
    () => ({
      ref,
      role: 'option',
      'aria-selected': Boolean(isActive && isSelected),
      tabIndex: isActive ? 0 : -1,
      onClick: () => handleSelect(index)
    }),
    [isActive, isSelected, ref, index, handleSelect]
  )

  if (asChild && isValidElement<{ className: string }>(children)) {
    const newClassName =
      `${children.props.className} ${isActive ? classNameActive : ''} ${isSelected ? classNameSelected : ''}`.trim()

    return cloneElement(
      children,
      getItemProps({
        ...props,
        ...children.props,
        className: newClassName,
        ...listItemProps
      })
    )
  }

  return (
    <button
      {...getItemProps({
        ...props,
        ...listItemProps
      })}
      className={classNames(
        { className },
        {
          [classNameActive]: isActive,
          [classNameSelected]: isSelected
        }
      )}
    >
      {children}
    </button>
  )
})

export default SelectOption
