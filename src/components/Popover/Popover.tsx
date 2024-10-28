import {
  arrow,
  autoUpdate,
  FloatingArrow,
  FloatingPortal,
  offset,
  OffsetOptions,
  Placement,
  safePolygon,
  shift,
  size,
  useClick,
  useFloating,
  useHover,
  useInteractions,
  useMergeRefs,
  useTransitionStyles
} from '@floating-ui/react'
import { forwardRef, HTMLProps, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  renderPopover: React.ReactNode | null
  className?: string
  offsetOptions?: OffsetOptions
  arrowWidth?: number
  arrowHeight?: number
  arrowColor?: string
  as?: React.ElementType
  initialOpen?: boolean
  placement?: Placement
  refPressEvent?: 'hover' | 'click' | 'none'
  applyAnimation?: boolean
  strokeArrowColor?: string
  strokeArrowWidth?: number
  isSameLengthAsReference?: boolean
  minusFloatingWidth?: number
  isChangePositionX?: boolean
  zIndex?: number
  isShowAtRoot?: boolean
}

export const Popover = forwardRef<HTMLElement, HTMLProps<HTMLElement> & PopoverProps>(function Popover(
  {
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    children,
    renderPopover,
    className,
    offsetOptions,
    arrowWidth = 20,
    arrowHeight = 7,
    arrowColor = 'white',
    as: Element = 'div',
    initialOpen = false,
    refPressEvent = 'hover',
    placement = 'bottom-start',
    applyAnimation = true,
    strokeArrowWidth = 2,
    strokeArrowColor = 'transparent',
    isSameLengthAsReference = false,
    minusFloatingWidth = 0,
    isChangePositionX = true,
    zIndex = 1,
    isShowAtRoot = true,
    ...props
  },
  propRef
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen
  const arrowRef = useRef<SVGSVGElement>(null)

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: open,
    onOpenChange: setOpen,
    middleware: [
      offset(offsetOptions),
      shift({ mainAxis: isChangePositionX }),
      arrow({ element: arrowRef }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: isSameLengthAsReference ? `${rects.reference.width - minusFloatingWidth}px` : 'auto'
          })
        }
      })
    ],
    placement,
    whileElementsMounted: autoUpdate
  })

  const arrowX = middlewareData.arrow?.x ?? 0
  const arrowY = middlewareData.arrow?.y ?? 0
  const transformX = arrowX + arrowWidth / 2
  const transformY = arrowY + arrowHeight

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: { opacity: 0, transform: 'scale(0)' },
    common: ({ side }) => ({
      transformOrigin: {
        top: `${transformX}px calc(100% + ${arrowHeight}px)`,
        bottom: `${transformX}px ${-arrowHeight}px`,
        left: `calc(100% + ${arrowHeight}px) ${transformY}px`,
        right: `${-arrowHeight}px ${transformY}px`
      }[side],
      transitionDuration: applyAnimation ? '0.2s' : '0s'
    }),
    duration: applyAnimation ? 250 : 0
  })

  const hover = useHover(context, {
    handleClose: safePolygon(),
    enabled: refPressEvent === 'hover' && controlledOpen == null
  })

  const click = useClick(context, {
    enabled: refPressEvent === 'click' && controlledOpen == null
  })

  const ref = useMergeRefs([propRef, refs.setReference])

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click])

  const handleClickFloatingElement = (event: React.MouseEvent) => {
    if (controlledOpen !== null) {
      event.stopPropagation()
    }
  }

  return (
    <Element ref={ref} {...getReferenceProps(props)} className={className}>
      {children}
      {isShowAtRoot && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: zIndex }}
            {...getFloatingProps()}
            onClick={handleClickFloatingElement}
          >
            {applyAnimation && (
              <AnimatePresence>
                {isMounted && (
                  <motion.div style={styles}>
                    {renderPopover}
                    <FloatingArrow
                      stroke={strokeArrowColor}
                      fill={arrowColor}
                      strokeWidth={strokeArrowWidth}
                      style={{ transform: 'translateY(-2px)' }}
                      ref={arrowRef}
                      context={context}
                      width={arrowWidth}
                      height={arrowHeight}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {!applyAnimation && isMounted && (
              <>
                {renderPopover}
                <FloatingArrow
                  stroke={strokeArrowColor}
                  style={{ transform: 'translateY(-2px)' }}
                  fill={arrowColor}
                  strokeWidth={strokeArrowWidth}
                  ref={arrowRef}
                  context={context}
                  width={arrowWidth}
                  height={arrowHeight}
                />
              </>
            )}
          </div>
        </FloatingPortal>
      )}
      {!isShowAtRoot && (
        <>
          <div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: zIndex }} {...getFloatingProps()}>
            {applyAnimation && (
              <AnimatePresence>
                {isMounted && (
                  <motion.div style={styles}>
                    {renderPopover}
                    <FloatingArrow
                      stroke={strokeArrowColor}
                      fill={arrowColor}
                      strokeWidth={strokeArrowWidth}
                      style={{ transform: 'translateY(-2px)' }}
                      ref={arrowRef}
                      context={context}
                      width={arrowWidth}
                      height={arrowHeight}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {!applyAnimation && isMounted && (
              <>
                {renderPopover}
                <FloatingArrow
                  stroke={strokeArrowColor}
                  style={{ transform: 'translateY(-2px)' }}
                  fill={arrowColor}
                  strokeWidth={strokeArrowWidth}
                  ref={arrowRef}
                  context={context}
                  width={arrowWidth}
                  height={arrowHeight}
                />
              </>
            )}
          </div>
        </>
      )}
    </Element>
  )
})
