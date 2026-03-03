import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NavHints } from './components/NavHints'
import { ProgressBar } from './components/ProgressBar'
import { SlideShell } from './components/SlideShell'
import { SlideContent } from './components/SlideContent'
import { slidesByLocale } from './data/slides'
import { uiByLocale } from './i18n'
import profileImage from './assets/profile.jpg'
import type { Locale } from './types'

const profileImageSrc: string | undefined = profileImage

const transition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1] as const,
}

const slideVariants = {
  enter: (direction: 1 | -1) => ({ x: direction > 0 ? 90 : -90, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: 1 | -1) => ({ x: direction > 0 ? -90 : 90, opacity: 0 }),
}

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const slideCanvasRef = useRef<HTMLDivElement | null>(null)

  const slides = useMemo(() => slidesByLocale[locale], [locale])
  const ui = useMemo(() => uiByLocale[locale], [locale])
  const currentSlide = useMemo(() => slides[currentSlideIndex], [slides, currentSlideIndex])

  const move = useCallback((nextIndex: number) => {
    setCurrentSlideIndex((previousIndex) => {
      const bounded = Math.max(0, Math.min(slides.length - 1, nextIndex))
      if (bounded === previousIndex) return previousIndex
      setDirection(bounded > previousIndex ? 1 : -1)
      return bounded
    })
  }, [slides.length])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingTarget =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable

      if (isTypingTarget) return

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        move(currentSlideIndex + 1)
      }

      if (event.key === 'ArrowLeft' || event.key === 'Backspace') {
        event.preventDefault()
        move(currentSlideIndex - 1)
      }

      if (event.key === 'Home') {
        event.preventDefault()
        move(0)
      }

      if (event.key === 'End') {
        event.preventDefault()
        move(slides.length - 1)
      }

    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentSlideIndex, move, slides.length])

  useEffect(() => {
    const canvas = slideCanvasRef.current
    if (!canvas) return

    const SWIPE_THRESHOLD = 52
    const AXIS_RATIO = 1.3
    const QUICK_SWIPE_MIN_DISTANCE = 22
    const QUICK_SWIPE_VELOCITY = 0.45

    const gesture = {
      active: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startTime: 0,
      pointerId: null as number | null,
    }

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      return Boolean(
        target.closest(
          'button, a, input, textarea, select, option, label, [role="button"], [role="link"], [data-no-swipe]',
        ),
      )
    }

    const resetGesture = () => {
      gesture.active = false
      gesture.pointerId = null
      gesture.startX = 0
      gesture.startY = 0
      gesture.currentX = 0
      gesture.currentY = 0
      gesture.startTime = 0
    }

    const startGesture = (x: number, y: number, target: EventTarget | null, pointerId?: number) => {
      if (isInteractiveTarget(target)) {
        resetGesture()
        return
      }
      gesture.active = true
      gesture.startX = x
      gesture.startY = y
      gesture.currentX = x
      gesture.currentY = y
      gesture.startTime = performance.now()
      gesture.pointerId = pointerId ?? null
    }

    const moveGesture = (x: number, y: number) => {
      if (!gesture.active) return
      gesture.currentX = x
      gesture.currentY = y
    }

    const endGesture = () => {
      if (!gesture.active) return

      const dx = gesture.currentX - gesture.startX
      const dy = gesture.currentY - gesture.startY
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      const elapsed = Math.max(performance.now() - gesture.startTime, 1)
      const velocity = absDx / elapsed
      const isHorizontalIntent = absDx > absDy * AXIS_RATIO
      const passedDistance = absDx > SWIPE_THRESHOLD
      const isQuickSwipe = absDx > QUICK_SWIPE_MIN_DISTANCE && velocity > QUICK_SWIPE_VELOCITY

      if (isHorizontalIntent && (passedDistance || isQuickSwipe)) {
        if (dx < 0) move(currentSlideIndex + 1)
        if (dx > 0) move(currentSlideIndex - 1)
      }

      resetGesture()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      startGesture(event.clientX, event.clientY, event.target, event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!gesture.active) return
      if (gesture.pointerId !== null && event.pointerId !== gesture.pointerId) return
      moveGesture(event.clientX, event.clientY)
    }

    const onPointerUp = (event: PointerEvent) => {
      if (gesture.pointerId !== null && event.pointerId !== gesture.pointerId) return
      endGesture()
    }

    const onPointerCancel = () => {
      resetGesture()
    }

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      startGesture(touch.clientX, touch.clientY, event.target)
    }

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      moveGesture(touch.clientX, touch.clientY)
    }

    const onTouchEnd = () => {
      endGesture()
    }

    const onTouchCancel = () => {
      resetGesture()
    }

    if (window.PointerEvent) {
      canvas.addEventListener('pointerdown', onPointerDown, { passive: true })
      canvas.addEventListener('pointermove', onPointerMove, { passive: true })
      canvas.addEventListener('pointerup', onPointerUp, { passive: true })
      canvas.addEventListener('pointercancel', onPointerCancel, { passive: true })
      return () => {
        canvas.removeEventListener('pointerdown', onPointerDown)
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerup', onPointerUp)
        canvas.removeEventListener('pointercancel', onPointerCancel)
      }
    }

    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })
    canvas.addEventListener('touchend', onTouchEnd, { passive: true })
    canvas.addEventListener('touchcancel', onTouchCancel, { passive: true })
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [currentSlideIndex, move])

  return (
    <div className="app-root">
      <ProgressBar current={currentSlideIndex} total={slides.length} />

      <div className="deck-stage">
        <SlideShell
          page={currentSlideIndex + 1}
          total={slides.length}
          ui={ui}
          locale={locale}
          onLocaleChange={setLocale}
        >
          <div ref={slideCanvasRef} className="slide-canvas">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`${locale}-${currentSlide.id}`}
                className="slide-motion-layer"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <SlideContent slide={currentSlide} profileImageSrc={profileImageSrc} />
              </motion.div>
            </AnimatePresence>
          </div>
        </SlideShell>
      </div>

      <NavHints ui={ui} />
    </div>
  )
}

export default App
