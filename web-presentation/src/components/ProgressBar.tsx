import { motion } from 'motion/react'

type ProgressBarProps = {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const width = `${((current + 1) / total) * 100}%`

  return (
    <div className="progress-track" aria-hidden="true">
      <motion.div
        className="progress-fill"
        animate={{ width }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
