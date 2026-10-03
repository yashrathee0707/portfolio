import { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

const greetings = ['Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao']

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: v => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      className="loader"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-top">
        <span>Yash Rathee</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>
      <div className="loader-greet">
        <motion.span key={Math.min(Math.floor(n / 20), 4)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {greetings[Math.min(Math.floor(n / 20), 4)]}
        </motion.span>
      </div>
      <div className="loader-bottom">
        <span className="loader-count">{n}</span>
        <div className="loader-bar"><span style={{ transform: `scaleX(${n / 100})` }} /></div>
      </div>
    </motion.div>
  )
}
