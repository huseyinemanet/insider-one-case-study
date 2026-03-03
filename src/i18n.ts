import type { Locale } from './types'

export type UiText = {
  deckKicker: string
  role: string
  prepared: string
  page: string
  hints: [string, string]
  optionalNote: string
}

export const uiByLocale: Record<Locale, UiText> = {
  en: {
    deckKicker: 'Case Presentation',
    role: 'Product Design Lead',
    prepared: 'Prepared for Design Leadership Interview | 03 Mar 2026',
    page: 'Page',
    hints: ['Left / Right', 'Space / Backspace'],
    optionalNote: 'Optional note',
  },
  tr: {
    deckKicker: 'Case Sunumu',
    role: 'Ürün Tasarım Lideri',
    prepared: 'Design Leadership görüşmesi için hazırlandı | 03 Mar 2026',
    page: 'Sayfa',
    hints: ['Sol / Sağ', 'Space / Backspace'],
    optionalNote: 'Opsiyonel not',
  },
}
