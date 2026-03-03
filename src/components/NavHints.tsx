import type { UiText } from '../i18n'

export function NavHints({ ui }: { ui: UiText }) {
  return (
    <div className="nav-hints" aria-hidden="true">
      {ui.hints.map((hint) => (
        <span key={hint}>{hint}</span>
      ))}
    </div>
  )
}
