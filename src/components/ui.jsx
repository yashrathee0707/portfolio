import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useSpring } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

/** Fade/slide-in when scrolled into view. */
export function Reveal({ as = 'div', delay = 0, y = 40, children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Glass card with cursor spotlight, glowing border and optional 3D tilt. */
export function Card({ className = '', tilt = true, children, ...rest }) {
  const ref = useRef(null)
  const move = e => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left, y = e.clientY - r.top
    el.style.setProperty('--mx', x + 'px')
    el.style.setProperty('--my', y + 'px')
    if (tilt) {
      el.style.transform = `perspective(1000px) rotateX(${(y / r.height - 0.5) * -5}deg) rotateY(${(x / r.width - 0.5) * 5}deg)`
    }
  }
  const leave = () => { ref.current.style.transform = '' }
  return (
    <div ref={ref} className={`card ${className}`} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </div>
  )
}

/** Element that gets pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <b ref={ref}>{v.toFixed(decimals)}{suffix}</b>
}

export function SectionHead({ label, children, className = '' }) {
  return (
    <div className={className}>
      <Reveal as="span" className="label">{label}</Reveal>
      <Reveal as="h2" className="h2" delay={0.08}>{children}</Reveal>
    </div>
  )
}
