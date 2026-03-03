# Insider One Case Study Presentation

Interactive web presentation for the **Chaos to Cadence / Atlas Case Study** story, prepared for design leadership interviews.

## What this project is

This project turns a classic deck into a keyboard-driven website:

- Slide-based flow (not scroll storytelling)
- Bilingual content (`EN / TR` toggle)
- Smooth transitions with `motion`
- Insider One visual language (Figtree, dark header, cream surface, orange-red emphasis)
- Icon-based bullet lists using `Nucleo UI Fill Duo 18`

## Tech stack

- `React 19`
- `TypeScript`
- `Vite`
- `motion`
- `nucleo-ui-fill-duo-18`

## Key features

- 17-slide narrative (intro + core case + outro)
- Keyboard navigation:
  - `ArrowRight` / `Space`: next slide
  - `ArrowLeft` / `Backspace`: previous slide
  - `Home`: first slide
  - `End`: last slide
- EN/TR language switch with animated pill
- Profile visuals and contextual inline avatar tags (e.g. Umutcan next to related line)
- Responsive behavior for desktop and mobile

## Project structure

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── SlideContent/
│   │   ├── SlideShell.tsx
│   │   ├── ProgressBar.tsx
│   │   └── NavHints.tsx
│   ├── data/
│   │   └── slides.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   ├── i18n.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── package.json
```

## Local setup

### 1) Install

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Then open the local URL shown in terminal (usually `http://localhost:5173`).

### 3) Production build

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Content updates

- Slide content is managed in [`src/data/slides.ts`](/Users/huseyinemanet/Desktop/Insider%20One/src/data/slides.ts)
- UI labels and fixed strings are in [`src/i18n.ts`](/Users/huseyinemanet/Desktop/Insider%20One/src/i18n.ts)
- Global styling and layout rules are in [`src/styles/global.css`](/Users/huseyinemanet/Desktop/Insider%20One/src/styles/global.css)

## Notes

- Repo is now organized from the **root** (no nested `web-presentation` folder).
- The deck is designed for presentation mode first; content density and motion timing are tuned for live speaking.
