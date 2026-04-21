import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import { countries } from '../data'

/**
 * Five-country row. Hovering a country reveals a local justice-gap stat
 * overlay on that card. Also renders a highlighted detail panel below.
 */
export default function Markets() {
  const [hover, setHover] = useState(null)
  const current = hover != null ? countries[hover] : null

  return (
    <section id="mission" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">07 — Markets</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Five countries. One legal infrastructure.</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {countries.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.04}>
              <div
                data-hover
                data-cursor={c.name.toLowerCase()}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                className="relative overflow-hidden border border-rule p-8 flex flex-col items-center justify-center gap-3 hover:bg-black hover:text-white transition-all min-h-[130px] cursor-none"
              >
                <div className="text-4xl">{c.flag}</div>
                <div className="font-mono text-sm uppercase tracking-widest">{c.name}</div>
                <AnimatePresence>
                  {hover === i && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 bg-black/90 text-white text-center text-xs md:text-sm leading-relaxed"
                    >
                      {c.stat}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 min-h-[60px]">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-muted max-w-3xl text-lg leading-relaxed"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-black">{current.name}</span>
                <span className="mx-2">—</span>
                {current.stat}
              </motion.div>
            ) : (
              <motion.p
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted max-w-3xl text-lg leading-relaxed"
              >
                Jurisdiction-specific legal logic in every market. Not generic guidance — locally calibrated, legally accurate, and actionable under the laws that apply to you.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
