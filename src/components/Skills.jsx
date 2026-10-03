import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skills, skillCats } from '../data.js'
import { Reveal, SectionHead } from './ui.jsx'

/** 3D rotating tag globe. Spins toward the pointer; drag on touch. */
function TagSphere({ active }) {
  const wrapRef = useRef(null)
  const els = useRef([])

  useEffect(() => {
    const n = skills.length
    let pts = skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const th = Math.sqrt(n * Math.PI) * phi
      return [Math.cos(th) * Math.sin(phi), Math.sin(th) * Math.sin(phi), Math.cos(phi)]
    })
    const idle = { ax: 0.0015, ay: 0.003 }
    let ax = idle.ax, ay = idle.ay, tx = ax, ty = ay, raf

    const rotate = ([x, y, z], a, b) => {
      const ca = Math.cos(a), sa = Math.sin(a)
      ;[y, z] = [y * ca - z * sa, y * sa + z * ca]
      const cb = Math.cos(b), sb = Math.sin(b)
      ;[x, z] = [x * cb + z * sb, -x * sb + z * cb]
      return [x, y, z]
    }

    const loop = () => {
      ax += (tx - ax) * 0.06
      ay += (ty - ay) * 0.06
      const r = wrapRef.current.offsetWidth * 0.4
      pts = pts.map(p => rotate(p, ax, ay))
      pts.forEach(([x, y, z], i) => {
        const el = els.current[i]
        if (!el) return
        const s = (z + 2.2) / 3.2
        el.style.transform = `translate(-50%, -50%) translate3d(${x * r}px, ${y * r}px, 0) scale(${s})`
        el.style.opacity = String(0.2 + 0.8 * ((z + 1) / 2))
        el.style.zIndex = String(Math.round(z * 100) + 100)
      })
      raf = requestAnimationFrame(loop)
    }
    loop()

    const wrap = wrapRef.current
    const onMove = e => {
      const b = wrap.getBoundingClientRect()
      ty = ((e.clientX - b.left) / b.width - 0.5) * 0.04
      tx = -((e.clientY - b.top) / b.height - 0.5) * 0.04
    }
    const onLeave = () => { tx = idle.ax; ty = idle.ay }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="sphere" ref={wrapRef} data-cursor="Spin">
      {skills.map(([name, cat], i) => (
        <span key={name} ref={el => (els.current[i] = el)} className={active === cat ? 'hl' : ''}>{name}</span>
      ))}
    </div>
  )
}

export default function Skills() {
  const [active, setActive] = useState('backend')
  const list = skills.filter(s => s[1] === active)

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead label="04 — Skills">My <span className="grad-text">toolbox.</span></SectionHead>
        <div className="skills-wrap">
          <Reveal><TagSphere active={active} /></Reveal>
          <Reveal delay={0.1}>
            <div className="cats">
              {Object.entries(skillCats).map(([id, label]) => (
                <button
                  key={id}
                  className={`cat${active === id ? ' on' : ''}`}
                  onMouseEnter={() => setActive(id)}
                  onClick={() => setActive(id)}
                >
                  {label}
                  <small>{String(skills.filter(s => s[1] === id).length).padStart(2, '0')}</small>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="chips cat-chips"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {list.map(([name]) => <span key={name}>{name}</span>)}
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
