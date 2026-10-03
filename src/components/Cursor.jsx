import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMedia } from '../hooks/hooks.js'

/** Dot + trailing ring cursor. Elements with data-cursor="Text" show a label. */
export default function Cursor() {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!fine) return
    document.body.classList.add('has-cursor')
    const update = target => {
      const t = target?.closest?.('a, button, [data-cursor]')
      setHover(!!t)
      setLabel(t?.dataset?.cursor || '')
    }
    const move = e => {
      x.set(e.clientX)
      y.set(e.clientY)
      update(e.target)
    }
    // Content moves under a still cursor while scrolling, so re-check what's under it.
    const scroll = () => update(document.elementFromPoint(x.get(), y.get()))
    addEventListener('mousemove', move)
    addEventListener('scroll', scroll, { passive: true })
    return () => {
      removeEventListener('mousemove', move)
      removeEventListener('scroll', scroll)
      document.body.classList.remove('has-cursor')
    }
  }, [fine, x, y])

  if (!fine) return null
  const size = label ? 88 : hover ? 60 : 34

  return (
    <>
      <motion.div className="cursor" style={{ x, y }}>
        <div className="cursor-dot" />
      </motion.div>
      <motion.div className="cursor" style={{ x: sx, y: sy }}>
        <motion.div
          className="cursor-ring"
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? 'rgba(255,255,255,1)' : hover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {label}
        </motion.div>
      </motion.div>
    </>
  )
}
