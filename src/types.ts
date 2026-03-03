export type Locale = 'en' | 'tr'

export type Slide = {
  id: string
  section: string
  title: string
  body: string[]
  sticky?: string
  layout?: 'standard' | 'minimal'
  subtitle?: string
  presenter?: string
  detail?: string
  showPhoto?: boolean
}
