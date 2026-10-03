import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import { Achievements, Contact, Footer } from './components/Contact.jsx'
import { setScrollLocked, useLenis } from './hooks/hooks.js'

export default function App() {
  useLenis()
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(false)
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => { setScrollLocked(loading) }, [loading])

  const onCopied = () => {
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" onDone={done} />}</AnimatePresence>
      <Cursor />
      <div className="grain" />
      <div className="aurora"><span /><span /><span /></div>
      <Nav ready={!loading} />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact onCopied={onCopied} />
      </main>
      <Footer />
      <div className={`toast${toast ? ' show' : ''}`}>✓ Email copied</div>
    </>
  )
}
