import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { experience } from '../data.js'
import { Card, Reveal, SectionHead } from './ui.jsx'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.7', 'end 0.6'] })

  return (
    <section id="experience" className="section">
      <div className="container exp">
        <div className="exp-left">
          <SectionHead label="02 — Experience">Where I've <span className="grad-text">shipped.</span></SectionHead>
          <Reveal as="p" delay={0.15}>
            From research labs to production warehouses. I design backends that stay calm under heavy, real-time load.
          </Reveal>
        </div>

        <div className="exp-list" ref={listRef}>
          <div className="exp-track"><motion.div className="exp-fill" style={{ scaleY: scrollYProgress }} /></div>
          {experience.map(job => (
            <Reveal key={job.role + job.date} className="exp-item" y={60}>
              <span className="exp-dot" />
              <Card className="exp-card">
                <div className="exp-head">
                  <h3>{job.role}</h3>
                  <span className="exp-date">{job.date}</span>
                </div>
                <p className="exp-org">{job.org}</p>
                <ul className="bullets">
                  {job.points.map((p, i) => (
                    <li key={i}>{p.map((part, j) => (j % 2 ? <strong key={j}>{part}</strong> : part))}</li>
                  ))}
                </ul>
                <div className="chips">{job.tags.map(t => <span key={t}>{t}</span>)}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
