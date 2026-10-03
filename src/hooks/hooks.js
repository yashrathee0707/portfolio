import { useEffect, useState } from 'react'
import Lenis from 'lenis'

let lenis = null

/** Buttery smooth scrolling (skipped for reduced-motion users). */
export function useLenis() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.09 })
    let raf
    const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenis = null }
  }, [])
}

export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (lenis) lenis.scrollTo(target, { duration: 1.6 })
  else if (target === 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  else target?.scrollIntoView({ behavior: 'smooth' })
}

export function setScrollLocked(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

export function useMedia(query) {
  const [match, setMatch] = useState(() => matchMedia(query).matches)
  useEffect(() => {
    const mq = matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

export function useScrollSpy(ids) {
  const [state, setState] = useState({ active: '', scrolled: false })
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      let active = ''
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && y + innerHeight * 0.4 >= el.offsetTop) active = id
      })
      setState(s => (s.active === active && s.scrolled === y > 40 ? s : { active, scrolled: y > 40 }))
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [ids])
  return state
}

/** Live clock in India time. */
export function useClock() {
  const fmt = () => new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
  })
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}
