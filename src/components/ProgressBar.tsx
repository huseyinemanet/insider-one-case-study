import { motion, useReducedMotion } from 'motion/react'

type ProgressBarProps = {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const reduceMotion = useReducedMotion()
  const width = `${((current + 1) / total) * 100}%`

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Slide progress"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-valuetext={`Slide ${current + 1} of ${total}`}
    >
      <motion.div
        className="progress-fill"
        animate={{ width }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
