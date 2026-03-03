import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import logo from '../assets/logo-insiderone.svg'
import type { UiText } from '../i18n'
import type { Locale } from '../types'

type SlideShellProps = {
  children: ReactNode
  page: number
  total: number
  ui: UiText
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function SlideShell({
  children,
  page,
  total,
  ui,
  locale,
  onLocaleChange,
}: SlideShellProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="deck">
      <header className="deck-header">
        <div className="deck-header__left">
          <img src={logo} alt="Insider One" className="deck-logo" />
          <p className="deck-kicker">{ui.deckKicker}</p>
        </div>
        <div className="deck-header__right">
          <p className="deck-role">{ui.role}</p>
          <span className="deck-page" aria-live="polite" aria-atomic="true">
            {page}/{total}
          </span>
          <div className="lang-toggle" role="group" aria-label="Language selector">
            <motion.span
              className="lang-toggle__pill"
              aria-hidden="true"
              animate={{ x: locale === 'en' ? '0%' : '100%' }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', duration: 0.25, bounce: 0.1 }
              }
            />
            <button
              type="button"
              className={locale === 'en' ? 'lang-btn is-active' : 'lang-btn'}
              onClick={() => onLocaleChange('en')}
              aria-pressed={locale === 'en'}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              className={locale === 'tr' ? 'lang-btn is-active' : 'lang-btn'}
              onClick={() => onLocaleChange('tr')}
              aria-pressed={locale === 'tr'}
              aria-label="Switch language to Turkish"
            >
              TR
            </button>
          </div>
        </div>
      </header>
      <main id="deck-main" className="deck-content">
        {children}
      </main>
      <footer className="deck-footer">
        <p>{ui.prepared}</p>
        <p>
          {ui.page} {page}
        </p>
      </footer>
    </div>
  )
}
