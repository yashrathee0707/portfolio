import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data.js'
import { useMedia } from '../hooks/hooks.js'
import { Card, Reveal, SectionHead } from './ui.jsx'

function ProjectCard({ p, i, tilt }) {
  return (
    <Card className="pcard" tilt={tilt} style={{ '--accent': p.accent }} data-cursor="Explore">
      <div className="pcard-visual">
        <span className="pcard-num">0{i + 1}</span>
        <span className="pcard-icon">{p.icon}</span>
        <div className="flow">
          {p.flow.map((f, j) => (
            <Fragment key={f}>
              {j > 0 && <i>→</i>}
              <span>{f}</span>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pcard-kind">{p.kind}</span>
          {p.link && (
            <a className="pcard-link" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="Visit">
              Live site ↗
            </a>
          )}
        </div>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <ul className="bullets">{p.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
        <div className="chips">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
      </div>
    </Card>
  )
}

/** Desktop: section pins and the cards scroll sideways. */
function HorizontalProjects({ onOverflow }) {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      // Cards must fit the screen height, otherwise fall back to the stacked layout.
      const st = stickyRef.current
      const kids = [...st.children]
      const gap = parseFloat(getComputedStyle(st).rowGap) || 0
      const need = kids.reduce((h, k) => h + k.offsetHeight, 0) + gap * (kids.length - 1)
      if (need > st.clientHeight) return onOverflow()
      setDist(Math.max(0, trackRef.current.scrollWidth - innerWidth))
    }
    measure()
    document.fonts?.ready.then(measure)
    addEventListener('resize', measure)
    return () => removeEventListener('resize', measure)
  }, [onOverflow])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])

  return (
    <section id="projects" ref={sectionRef} className="hscroll" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="hscroll-sticky" ref={stickyRef}>
        <div className="container hscroll-head">
          <SectionHead label="03 — Selected work">Things I've <span className="grad-text">built.</span></SectionHead>
          <div className="hscroll-hint">Keep scrolling →</div>
        </div>
        <motion.div className="track" ref={trackRef} style={{ x }}>
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} tilt={false} />)}
        </motion.div>
        <div className="container">
          <div className="hscroll-bar"><motion.span style={{ scaleX: scrollYProgress }} /></div>
        </div>
      </div>
    </section>
  )
}

function StackedProjects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead label="03 — Selected work">Things I've <span className="grad-text">built.</span></SectionHead>
        <div className="vprojects">
          {projects.map((p, i) => (
            <Reveal key={p.title}><ProjectCard p={p} i={i} tilt /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  const wide = useMedia('(min-width: 1000px)')
  const [fits, setFits] = useState(true)
  const tooTall = useCallback(() => setFits(false), [])
  useEffect(() => {
    const retry = () => setFits(true)
    addEventListener('resize', retry)
    return () => removeEventListener('resize', retry)
  }, [])
  return wide && fits ? <HorizontalProjects onOverflow={tooTall} /> : <StackedProjects />
}
