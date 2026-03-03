import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import {
  IconAlertWarningFillDuo18,
  IconArrowRotateClockwiseFillDuo18,
  IconArrowsLeftRightTrailFillDuo18,
  IconBookOpenFillDuo18,
  IconChartBarTrendUpFillDuo18,
  IconCheckFillDuo18,
  IconClipboardCheckFillDuo18,
  IconCodeFillDuo18,
  IconFlagFillDuo18,
  IconFoldersFillDuo18,
  IconLayersFillDuo18,
  IconLightbulbFillDuo18,
  IconLinkFillDuo18,
  IconRoadmapFillDuo18,
  IconRocketFillDuo18,
  IconTargetFillDuo18,
  IconUsersFillDuo18,
} from 'nucleo-ui-fill-duo-18'
import type { Slide } from '../../types'
import umutcanImage from '../../assets/umutcan.jpeg'

type SlideContentProps = {
  slide: Slide
  profileImageSrc?: string
}

const transition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }
type IconComponent = ComponentType<Record<string, unknown>>

function pickBulletIcon(item: string): IconComponent {
  const text = item.toLowerCase()

  if (text.includes('demand') || text.includes('talep') || text.includes('hız') || text.includes('speed')) return IconChartBarTrendUpFillDuo18
  if (text.includes('project') || text.includes('proje') || text.includes('domain') || text.includes('portal')) return IconFoldersFillDuo18
  if (text.includes('hiring') || text.includes('onboarding') || text.includes('ekip') || text.includes('designer') || text.includes('tasarımcı')) return IconUsersFillDuo18
  if (text.includes('context switching') || text.includes('coordination') || text.includes('alignment') || text.includes('parity') || text.includes('cross-platform')) return IconArrowsLeftRightTrailFillDuo18
  if (text.includes('urgent') || text.includes('acil') || text.includes('mismatch') || text.includes('problem') || text.includes('risk')) return IconAlertWarningFillDuo18
  if (text.includes('rework') || text.includes('loop') || text.includes('restart') || text.includes('iterate') || text.includes('güncell')) return IconArrowRotateClockwiseFillDuo18
  if (text.includes('component') || text.includes('token') || text.includes('type') || text.includes('spacing') || text.includes('color') || text.includes('frame')) return IconLayersFillDuo18
  if (text.includes('quality') || text.includes('tutarl') || text.includes('consistency') || text.includes('compliance')) return IconTargetFillDuo18
  if (text.includes('governance') || text.includes('review') || text.includes('versioning') || text.includes('checkpoint') || text.includes('check')) return IconClipboardCheckFillDuo18
  if (text.includes('documentation') || text.includes('guideline') || text.includes('best practice') || text.includes('dokümantasyon') || text.includes('rehber')) return IconBookOpenFillDuo18
  if (text.includes('code') || text.includes('figma') || text.includes('ios') || text.includes('android') || text.includes('em')) return IconCodeFillDuo18
  if (text.includes('contract') || text.includes('link') || text.includes('pattern-first') || text.includes('exception')) return IconLinkFillDuo18
  if (text.includes('strategy') || text.includes('strateji') || text.includes('roadmap') || text.includes('goal') || text.includes('hedef')) return IconRoadmapFillDuo18
  if (text.includes('outcome') || text.includes('throughput') || text.includes('impact') || text.includes('arttı') || text.includes('increased')) return IconRocketFillDuo18
  if (text.includes('learn') || text.includes('öğren') || text.includes('guardrail') || text.includes('ownership')) return IconLightbulbFillDuo18
  if (text.includes('closing') || text.includes('kapanış')) return IconFlagFillDuo18

  return IconCheckFillDuo18
}

function showUmutcanTag(item: string): boolean {
  const text = item.toLowerCase()
  return text.includes('product design manager')
}

export function SlideContent({ slide, profileImageSrc }: SlideContentProps) {
  if (slide.layout === 'minimal') {
    return (
      <section className="minimal-block">
        <div className="minimal-head-anchor">
          <motion.div
            className="minimal-head"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <h1 className="minimal-title">{slide.title}</h1>
            {slide.subtitle ? <p className="minimal-subtitle">{slide.subtitle}</p> : null}
          </motion.div>
        </div>

        <div className="minimal-foot-anchor">
          <motion.div
            className="minimal-foot"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.14 }}
          >
            {slide.showPhoto ? (
              <div>
                {profileImageSrc ? (
                  <img src={profileImageSrc} alt="Profile" className="profile-photo" />
                ) : (
                  <div className="profile-placeholder" aria-label="Profile photo placeholder" />
                )}
              </div>
            ) : null}

            {slide.presenter || slide.detail ? (
              <div className="identity-stack">
                {slide.presenter ? <p className="minimal-presenter">{slide.presenter}</p> : null}
                {slide.detail ? <p className="minimal-detail">{slide.detail}</p> : null}
              </div>
            ) : null}
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="slide-layout">
      <div className="slide-wrap">
        <motion.p
          className="slide-section-label"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transition}
        >
          {slide.section}
        </motion.p>

        <motion.h1
          className="slide-title"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...transition, delay: 0.03 }}
        >
          {slide.title}
        </motion.h1>

        <motion.ul
          className="slide-list"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.05, delayChildren: 0.09 },
            },
          }}
        >
          {slide.body.map((item, index) => {
            const Icon = pickBulletIcon(item)
            return (
            <motion.li
              key={`${item}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition },
              }}
            >
              <Icon className="slide-item-icon" size={18} aria-hidden="true" />
              <span className="slide-item-text">
                {item}
                {showUmutcanTag(item) ? (
                  <span className="person-chip" aria-label="Umutcan">
                    <img src={umutcanImage} alt="Umutcan" className="person-chip__avatar" />
                    <span className="person-chip__name">Umutcan</span>
                  </span>
                ) : null}
              </span>
            </motion.li>
            )
          })}
        </motion.ul>
      </div>

      <div className="quote-column">
        {slide.sticky ? (
          <motion.aside
            className="sticky-line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
          >
            {slide.sticky}
          </motion.aside>
        ) : null}
      </div>
    </section>
  )
}
