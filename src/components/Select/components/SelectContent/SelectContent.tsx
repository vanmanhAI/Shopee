import { forwardRef, HTMLProps } from 'react'
import useSelectContext from '../../hooks/useSelectContext'
import { FloatingList, FloatingPortal, useMergeRefs } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface SelectContentProps {
  children: React.ReactNode
}

const SelectContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement> & SelectContentProps>(function SelectContent(
  { children, ...props },
  propRef
) {
  const {
    elementsRef,
    labelsRef,
    floatingStyles,
    searchInputSuggestions,
    zIndex,
    isShowAtRoot,
    applyAnimation,
    isMounted,
    styles,
    isOpen,
    framesAnimation,
    ...context
  } = useSelectContext()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useMergeRefs([context.refs.setFloating, propRef])

  const animationProp = framesAnimation ? framesAnimation : { style: styles }

  return isShowAtRoot ? (
    <FloatingPortal>
      <div
        ref={ref}
        className='focus-within:border-none focus-within:outline-none'
        style={{ ...floatingStyles, zIndex }}
        {...context.getFloatingProps({ ...searchInputSuggestions, ...props })}
      >
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {applyAnimation && (
            <AnimatePresence>{isMounted && <motion.div {...animationProp}>{children}</motion.div>}</AnimatePresence>
          )}
          {!applyAnimation && isOpen && <>{children}</>}
        </FloatingList>
      </div>
    </FloatingPortal>
  ) : (
    <div
      ref={ref}
      className='focus-within:border-none focus-within:outline-none'
      style={{}}
      {...context.getFloatingProps({ ...searchInputSuggestions, ...props })}
    >
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {applyAnimation && (
          <AnimatePresence>{isMounted && <motion.div {...animationProp}>{children}</motion.div>}</AnimatePresence>
        )}
        {!applyAnimation && isOpen && <>{children}</>}
      </FloatingList>
    </div>
  )
})

export default SelectContent
