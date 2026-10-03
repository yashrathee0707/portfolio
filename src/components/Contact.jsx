import { motion } from 'framer-motion'
import { achievements, profile } from '../data.js'
import { scrollToId, useClock } from '../hooks/hooks.js'
import { Card, Magnetic, Reveal, SectionHead, ease } from './ui.jsx'

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="container">
        <SectionHead label="05 — Beyond code">Recognition &amp; <span className="grad-text">leadership.</span></SectionHead>
        <div className="ach">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <Card className="ach-card">
                <div className="ach-top">
                  <span className="ach-icon">{a.icon}</span>
                  <span className="tile-k">{a.k}</span>
                </div>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const titleWords = ["Let's", 'build', 'something', 'great.']

export function Contact({ onCopied }) {
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch { /* clipboard blocked */ }
    onCopied()
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal as="span" className="label">06 — Contact</Reveal>
        <motion.h2 className="contact-title" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {titleWords.map((w, i) => (
            <span className="w" key={w}>
              <motion.span
                variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                transition={{ duration: 1, delay: i * 0.08, ease }}
              >
                <span className={i >= 2 ? 'grad-text' : ''}>{w}</span>
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <Reveal>
          <Magnetic strength={0.45}>
            <a className="orb" href={`mailto:${profile.email}`} data-cursor="Write">
              Say hello <span>→</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.1}>
          <button className="copy-email" onClick={copy}>
            {profile.email} <small>Copy</small>
          </button>
        </Reveal>

        <Reveal className="contact-links" delay={0.2}>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={profile.phoneHref}>{profile.phone}</a>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const time = useClock()
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Yash Rathee</span>
      <span>Local time · {time} IST</span>
      <button onClick={() => scrollToId('top')}>Back to top ↑</button>
    </footer>
  )
}
