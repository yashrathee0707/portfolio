import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { statement, stats } from '../data.js'
import { useClock } from '../hooks/hooks.js'
import { Card, Counter, Reveal } from './ui.jsx'

function Word({ children, progress, range, hl }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return <motion.span style={{ opacity }} className={hl ? 'grad-text' : ''}>{children}</motion.span>
}

/** Paragraph that lights up word by word as you scroll. */
function Statement() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = statement.split(' ')
  return (
    <p ref={ref} className="statement">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} hl={w.startsWith('*')}>
          {w.replace('*', '')}
        </Word>
      ))}
    </p>
  )
}

function Clock() {
  return <div className="clock">{useClock()}</div>
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal as="span" className="label">01 — About me</Reveal>
        <Statement />

        <div className="bento">
          <Reveal className="span-2 row-2">
            <Card className="tile tile-now">
              <div>
                <span className="tile-k"><span className="dot" /> Currently building</span>
                <h3>BCI NAVI, an AI agent that runs warehouses.</h3>
                <p>Enterprise LLM agent at BarCode India for real-time anomaly detection and predictive inventory optimization.</p>
              </div>
              <div className="terminal">
                <div className="bar"><i /><i /><i /></div>
                <div className="cmd">navi.stream(&quot;warehouse-signals&quot;)</div>
                <div><span className="ok">✓</span> 100K+ events / day ingested</div>
                <div className="cmd">navi.detect(anomalies)</div>
                <div><span className="ok">✓</span> Kafka · Redis · LangChain · OpenAI</div>
                <div className="cmd"><span className="blink">▍</span></div>
              </div>
            </Card>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * (i + 1)}>
              <Card className="tile tile-stat">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
                <small>{s.label}</small>
              </Card>
            </Reveal>
          ))}

          <Reveal className="span-2">
            <Card className="tile">
              <span className="tile-k">🎓 Education</span>
              <h3>Bennett University</h3>
              <p>B.Tech in Computer Science Engineering · 2021 – 2025 · CGPA 8.45</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="tile">
              <span className="tile-k">📍 Location</span>
              <h3>Gurugram, India</h3>
              <Clock />
            </Card>
          </Reveal>
          <Reveal delay={0.16}>
            <Card className="tile">
              <span className="tile-k">🔬 Research</span>
              <h3>IIT Roorkee</h3>
              <p>Published paper on satellite image segmentation.</p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
