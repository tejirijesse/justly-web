import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'
import { traction } from '../data'

/**
 * Four traction metrics with animated bars. Each bar fills to a proportion
 * of the largest value when scrolled into view.
 */
export default function Traction() {
  const max = Math.max(...traction.map(s => Math.max(s.to, 1)))

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">08 — Traction</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Before launch. Before revenue.<br />Before a single ad.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {traction.map((s, i) => {
            const ratio = Math.max(0.02, s.to / max)
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border-t border-black pt-6">
                  <div className="font-mono font-bold text-5xl md:text-6xl tracking-tight">
                    {s.prefix || ''}<Counter to={s.to} />
                  </div>
                  <div className="mt-4 text-muted text-sm">{s.label}</div>
                  <div className="mt-4 h-[3px] bg-rule overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: ratio }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.4, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-black origin-left"
                    />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-12 text-muted max-w-3xl text-lg leading-relaxed">
          We have built the brand, the content infrastructure, the financial model, the partner pipeline, and the waitlist. We are raising $500K pre-seed to build the product that matches the demand.
        </Reveal>

        <Reveal>
          <a href="#waitlist" className="mt-10 inline-flex items-center gap-2 underline underline-offset-4 decoration-1 hover:decoration-2">
            View Investment Thesis <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
