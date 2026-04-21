import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus, Search } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { faqs } from '../data'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!term) return faqs
    return faqs.filter(f => (f.q + ' ' + f.a).toLowerCase().includes(term))
  }, [term])

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">10 — FAQ</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Straight answers.</h2>
        </Reveal>

        <Reveal className="mt-10 max-w-xl">
          <label className="flex items-center gap-3 border border-rule bg-white px-4 py-3 focus-within:border-black transition-colors">
            <Search size={16} strokeWidth={1.5} className="text-muted" />
            <input
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search questions…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
              aria-label="Search FAQ"
            />
            {q && (
              <button onClick={() => setQ('')} className="text-xs font-mono uppercase text-muted hover:text-black" aria-label="Clear search">clear</button>
            )}
          </label>
        </Reveal>

        <div className="mt-10 border-t border-rule">
          {filtered.length === 0 && (
            <p className="py-8 text-muted">No questions match “{q}”. Try a different term, or <a className="underline" href="mailto:legal@getjustly.org">email us</a>.</p>
          )}
          {filtered.map((it, i) => {
            const isOpen = open === i
            return (
              <Reveal key={it.q} delay={i * 0.03}>
                <div className="border-b border-rule">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-hover
                    className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-xl md:text-2xl group-hover:translate-x-1 transition-transform">{it.q}</span>
                    <span className="mt-1 shrink-0">
                      {isOpen ? <Minus size={22} strokeWidth={1.5} /> : <Plus size={22} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-muted max-w-3xl leading-relaxed">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
