import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { phrases } from '../data.js'
import { scrollToId } from '../hooks/hooks.js'
import { Magnetic, ease } from './ui.jsx'

const Hero3D = lazy(() => import('./Hero3D.jsx'))

function SplitLine({ text, outline, ready, delay }) {
  return (
    <span className="line">
      <span className={outline ? 'outline' : ''}>
        {[...text].map((c, i) => (
          <motion.span
            key={i}
            className="char"
            initial={{ y: '115%' }}
            animate={ready ? { y: '0%' } : {}}
            transition={{ duration: 1.1, delay: delay + i * 0.05, ease }}
          >
            <span className="c">{c}</span>
          </motion.span>
        ))}
      </span>
    </span>
  )
}

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  const [ri, setRi] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % phrases.length), 2400)
    return () => clearInterval(t)
  }, [])

  const fade = d => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay: d, ease },
  })

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-canvas">
        <Suspense fallback={null}><Hero3D /></Suspense>
      </div>
      <div className="hero-vignette" />

      <motion.div className="hero-content" style={{ y, opacity, scale }}>
        <motion.p className="hero-badge" {...fade(0.2)}>
          <span className="dot" /> Software Engineer @ BarCode India
        </motion.p>

        <h1 className="hero-title">
          <SplitLine text="Yash" ready={ready} delay={0.1} />
          <SplitLine text="Rathee" outline ready={ready} delay={0.3} />
        </h1>

        <motion.div className="hero-role" {...fade(0.7)}>
          <span className="muted">I build</span>
          <span className="role-slot">
            <AnimatePresence mode="wait">
              <motion.span
                key={ri}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                {phrases[ri]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div className="hero-cta" {...fade(0.85)}>
          <Magnetic>
            <a className="btn btn-primary" href="#projects" onClick={e => { e.preventDefault(); scrollToId('projects') }}>
              View my work <span>↘</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href="#contact" onClick={e => { e.preventDefault(); scrollToId('contact') }}>
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div className="hero-meta" {...fade(1)}>
        <span>Based in Gurugram, India</span>
        <span className="scroll-cue">Scroll<i /></span>
        <span>Open to opportunities</span>
      </motion.div>
    </section>
  )
}
