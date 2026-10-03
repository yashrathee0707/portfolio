# Yash Rathee | Portfolio

A responsive, interactive portfolio website for Yash Rathee, Software Engineer (Java, Spring Boot, Kafka, LLM agents).

## Features

- 3D animated hero (React Three Fiber) with a professional, recruiter-friendly layout
- Smooth scrolling (Lenis), custom cursor, scroll-triggered reveals and counters
- Bento "About" grid, scroll-drawn experience timeline
- Horizontal-scroll project showcase (stacks vertically on small screens)
- Interactive 3D skills globe
- Fully responsive from 320px phones to large desktops
- Auto-deploys to GitHub Pages on every push to `main`

## Tech Stack

- React 18 + Vite
- Framer Motion
- Three.js via React Three Fiber / Drei
- Lenis smooth scroll
- Plain CSS

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Structure

```
src/
├── App.jsx
├── data.js              # all content (projects, experience, skills)
├── index.css
├── hooks/hooks.js       # smooth scroll, media queries, scroll-spy, clock
└── components/
    ├── Hero.jsx, Hero3D.jsx
    ├── Nav.jsx, Loader.jsx, Cursor.jsx, Marquee.jsx
    ├── About.jsx, Experience.jsx, Projects.jsx, Skills.jsx
    ├── Contact.jsx      # achievements, contact, footer
    └── ui.jsx           # Reveal, Card, Magnetic, Counter
```

## Customizing

Edit `src/data.js` to change content. Colors are CSS variables at the top of `src/index.css`.
