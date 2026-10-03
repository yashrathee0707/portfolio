# Yash Rathee | Portfolio

A responsive, interactive portfolio website for Yash Rathee, Software Engineer (Java, Spring Boot, Kafka, LLM agents).

## Features

- Animated particle-network background that reacts to the mouse
- Typing hero, scroll-triggered reveals, animated stat counters
- 3D tilt and spotlight effect on cards
- Experience timeline, project showcase, animated filterable skills grid
- Dark/light theme toggle (remembered between visits)
- Scroll progress bar, mobile menu, copy-email button

## Tech Stack

- React 18
- Vite
- Framer Motion
- Plain CSS (variables, no UI framework)

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

## Structure

```
Portfolio/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data.js            # all content (experience, projects, skills)
    ├── index.css
    ├── hooks/hooks.js     # theme, typing, scroll-spy
    └── components/
        ├── Background.jsx # particle canvas + cursor glow
        ├── Nav.jsx
        ├── Sections.jsx
        └── ui.jsx         # Reveal, Tilt, Counter
```

## Customizing

Edit `src/data.js` to change content. Colors are CSS variables at the top of `src/index.css`.
