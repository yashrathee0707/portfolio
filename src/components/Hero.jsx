import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data.js'
import { scrollToId, useClock } from '../hooks/hooks.js'
import { Magnetic, ease } from './ui.jsx'

const Hero3D = lazy(() => import('./Hero3D.jsx'))

const facts = [
  ['BarCode India', 'Software Engineer'],
  ['EchoForge', 'AI product, live'],
  ['IIT Roorkee', 'Published research'],
]

const icons = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3v-11zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11z" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
  ),
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const time = useClock()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const fade = d => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay: d * 0.5, ease },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-canvas">
        <Suspense fallback={null}><Hero3D /></Suspense>
      </div>
      <div className="hero-vignette" />

      <motion.div className="hero-content" style={{ y, opacity }}>
        <motion.p className="hero-badge" {...fade(0.1)}>
          <span className="dot" /> Open to new opportunities
        </motion.p>

        <h1 className="hero-name">
          <span className="line">
            <motion.span
              initial={{ y: '110%' }}
              animate={ready ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              Yash Rathee
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-headline" {...fade(0.35)}>
          Software Engineer building <em>AI agents</em> and <em>real-time distributed systems</em>.
        </motion.p>

        <motion.p className="hero-summary" {...fade(0.45)}>
          I design Java and Spring Boot backends, Kafka event pipelines and LLM-powered products that run reliably in production.
        </motion.p>

        <motion.div className="hero-cta" {...fade(0.55)}>
          <Magnetic strength={0.25}>
            <a className="btn btn-primary" href="#projects" onClick={e => { e.preventDefault(); scrollToId('projects') }}>
              View my work <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a className="btn btn-ghost" href="#contact" onClick={e => { e.preventDefault(); scrollToId('contact') }}>
              Contact me
            </a>
          </Magnetic>
          <div className="hero-socials">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{icons.linkedin}</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">{icons.github}</a>
            <a href={`mailto:${profile.email}`} aria-label="Email">{icons.mail}</a>
          </div>
        </motion.div>

        <motion.dl className="hero-facts" {...fade(0.7)}>
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div className="hero-meta" {...fade(0.9)}>
        <span>Gurugram, India · {time} IST</span>
        <span className="scroll-cue">Scroll<i /></span>
      </motion.div>
    </section>
  )
}
