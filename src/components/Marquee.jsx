import { useRef } from 'react'
import {
  motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity,
} from 'framer-motion'
import { marqueeA, marqueeB } from '../data.js'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Infinite row that speeds up and reverses with scroll velocity. */
function VelocityRow({ items, base, outline }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, v => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  return (
    <div className="vrow">
      <motion.div className="vrow-track" style={{ x }}>
        {[0, 1].map(k => (
          <div className="vrow-group" key={k} aria-hidden={k === 1}>
            {items.map(t => (
              <span key={t} className={outline ? 'outline' : ''}>{t}<i>✦</i></span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee">
      <VelocityRow items={marqueeA} base={-2} />
      <VelocityRow items={marqueeB} base={2} outline />
    </div>
  )
}
