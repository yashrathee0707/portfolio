import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { scrollToId, setScrollLocked, useScrollSpy } from '../hooks/hooks.js'
import { profile } from '../data.js'
import { ease } from './ui.jsx'

const items = [
  ['about', 'About'],
  ['experience', 'Work'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]
const ids = items.map(i => i[0])

export default function Nav({ ready }) {
  const { active } = useScrollSpy(ids)
  const { scrollYProgress } = useScroll()
  const [open, setOpen] = useState(false)

  useEffect(() => { if (ready) setScrollLocked(open) }, [open, ready])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 300 : 0)
  }

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <motion.header
        className="nav"
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease }}
      >
        <a href="#top" className="logo" onClick={e => go(e, 'top')}>YR<i>.</i></a>
        <nav className="pill">
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={e => go(e, id)}>
              {active === id && (
                <motion.span layoutId="pill" className="pill-bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <a className="nav-cta" href={`mailto:${profile.email}`}>
          <span className="dot" /> Hire me
        </a>
        <button className={`menu-btn${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span /><span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {items.map(([id, label], i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={e => go(e, id)}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease }}
              >
                <small>0{i + 1}</small>{label}
              </motion.a>
            ))}
            <motion.div className="mobile-menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
