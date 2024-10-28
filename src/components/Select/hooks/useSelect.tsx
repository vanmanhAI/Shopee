import {
  autoUpdate,
  flip,
  offset,
  OffsetOptions,
  Placement,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles
} from '@floating-ui/react'
import { AnimationProps } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export interface SelectOptions {
  initialOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  mode?: 'default' | 'search'
  refPressEvent?: 'click' | 'focus' | 'none'
  isSameLengthAsReference?: boolean
  minusFloatingWidth?: number
  placement?: Placement
  offsetOption?: OffsetOptions
  zIndex?: number
  isShowAtRoot?: boolean
  applyAnimation?: boolean
  framesAnimation?: AnimationProps
  controlledLabel?: string
}

export default function useSelect({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  mode = 'default',
  refPressEvent = 'click',
  isSameLengthAsReference = false,
  minusFloatingWidth = 0,
  placement = 'bottom-start',
  offsetOption = 0,
  zIndex = 1,
  isShowAtRoot = true,
  applyAnimation = false,
  controlledLabel = '',
  framesAnimation
}: SelectOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const isOpen = controlledOpen ?? uncontrolledOpen
  const setIsOpen = setControlledOpen ?? setUncontrolledOpen
  const targetLabel = mode === 'default' ? selectedLabel : null

  const data = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: isSameLengthAsReference ? `${rects.reference.width - minusFloatingWidth}px` : 'auto'
          })
        }
      }),
      offset(offsetOption)
    ]
  })

  const { isMounted, styles } = useTransitionStyles(data.context, {
    initial: { gridTemplateRows: '0fr', opacity: 0 },
    common: { overflow: 'hidden', display: 'grid' },
    open: { gridTemplateRows: '1fr', opacity: 1 },
    duration: framesAnimation ? 0 : 250
  })

  const elementsRef = useRef<Array<HTMLElement | null>>([])
  const labelsRef = useRef<Array<string | null>>([])

  useEffect(() => {
    if (controlledLabel) {
      const index = labelsRef.current.indexOf(controlledLabel)
      if (index !== -1) {
        setSelectedIndex(index)
        setSelectedLabel(controlledLabel)
      }
    }
  }, [controlledLabel])

  const handleSelect = useCallback(
    (index: number | null) => {
      if (mode === 'default') {
        setSelectedIndex(index)
        setIsOpen(false)
        if (index !== null) {
          setSelectedLabel(labelsRef.current[index])
        }
      }
    },
    [setIsOpen, mode]
  )

  // Search option
  const optionSearchInput = useMemo(() => {
    if (mode === 'search') {
      return {
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            setIsOpen(false)
          }
        }
      }
    }
    return {}
  }, [mode, setIsOpen])

  const searchInputSuggestions = useMemo(() => {
    if (mode === 'search') {
      return {
        onClick: () => setIsOpen(false)
      }
    }
    return {}
  }, [mode, setIsOpen])

  const listNav = useListNavigation(data.context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true
  })

  const click = useClick(data.context, {
    enabled: refPressEvent === 'click' && controlledOpen === undefined
  })

  const dismiss = useDismiss(data.context, { enabled: refPressEvent === 'click' && controlledOpen === undefined })

  const focus = useFocus(data.context, { enabled: refPressEvent === 'focus' && controlledOpen === undefined })

  const role = useRole(data.context, { role: 'combobox' })

  const interactions = useInteractions([listNav, click, dismiss, role, focus])

  return useMemo(
    () => ({
      isOpen,
      setIsOpen,
      activeIndex,
      selectedIndex,
      elementsRef,
      ...interactions,
      ...data,
      optionSearchInput,
      searchInputSuggestions,
      handleSelect,
      zIndex,
      isShowAtRoot,
      applyAnimation,
      isMounted,
      styles,
      framesAnimation,
      targetLabel,
      labelsRef
    }),
    [
      activeIndex,
      selectedIndex,
      interactions,
      handleSelect,
      optionSearchInput,
      searchInputSuggestions,
      data,
      isOpen,
      setIsOpen,
      zIndex,
      isShowAtRoot,
      applyAnimation,
      isMounted,
      styles,
      framesAnimation,
      targetLabel
    ]
  )
}
