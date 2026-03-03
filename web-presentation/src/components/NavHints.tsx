import type { UiText } from '../i18n'

export function NavHints({ ui }: { ui: UiText }) {
  return (
    <div className="nav-hints" aria-hidden="true">
      <span>{ui.hints[0]}</span>
      <span>{ui.hints[1]}</span>
      <span>{ui.hints[2]}</span>
    </div>
  )
}
