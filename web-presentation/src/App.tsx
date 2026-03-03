import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
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

  const slides = useMemo(() => slidesByLocale[locale], [locale])
  const ui = useMemo(() => uiByLocale[locale], [locale])
  const currentSlide = useMemo(() => slides[currentSlideIndex], [slides, currentSlideIndex])

  const move = (nextIndex: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, nextIndex))
    if (bounded === currentSlideIndex) return
    setDirection(bounded > currentSlideIndex ? 1 : -1)
    setCurrentSlideIndex(bounded)
  }

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
  }, [currentSlideIndex, slides.length])

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
        </SlideShell>
      </div>

      <NavHints ui={ui} />
    </div>
  )
}

export default App
