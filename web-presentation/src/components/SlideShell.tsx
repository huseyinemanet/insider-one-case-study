import { motion } from 'motion/react'
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
  return (
    <div className="deck">
      <header className="deck-header">
        <div className="deck-header__left">
          <img src={logo} alt="Insider One" className="deck-logo" />
          <p className="deck-kicker">{ui.deckKicker}</p>
        </div>
        <div className="deck-header__right">
          <p className="deck-role">{ui.role}</p>
          <span className="deck-page">{page}/{total}</span>
          <div className="lang-toggle" role="group" aria-label="Language selector">
            <motion.span
              className="lang-toggle__pill"
              aria-hidden="true"
              animate={{ x: locale === 'en' ? '0%' : '100%' }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <button
              type="button"
              className={locale === 'en' ? 'lang-btn is-active' : 'lang-btn'}
              onClick={() => onLocaleChange('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={locale === 'tr' ? 'lang-btn is-active' : 'lang-btn'}
              onClick={() => onLocaleChange('tr')}
            >
              TR
            </button>
          </div>
        </div>
      </header>
      <main className="deck-content">{children}</main>
      <footer className="deck-footer">
        <p>{ui.prepared}</p>
        <p>
          {ui.page} {page}
        </p>
      </footer>
    </div>
  )
}
