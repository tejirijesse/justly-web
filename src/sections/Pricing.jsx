import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'
import { pricingTiers, currencies } from '../data'

function formatPrice(usd, currency) {
  if (usd === 0) return '0'
  const converted = usd * currency.rate
  if (currency.code === 'USD') return Math.round(converted).toString()
  if (converted >= 1000) return Math.round(converted).toLocaleString()
  return Math.round(converted).toString()
}

export default function Pricing() {
  const [currency, setCurrency] = useState(currencies[0])

  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">09 — Pricing</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Priced for access.<br /><span className="text-gray-400">Not for extraction.</span></h2>
        </Reveal>
        <Reveal className="mt-8 text-muted max-w-2xl text-lg">
          Basic access is free forever. Pro costs less than one hour with a lawyer. Institutions pay for scale.
        </Reveal>

        <Reveal className="mt-10 inline-flex flex-wrap items-center gap-2 border border-rule p-1">
          {currencies.map(c => {
            const active = currency.code === c.code
            return (
              <button
                key={c.code}
                onClick={() => setCurrency(c)}
                data-hover
                className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 transition-colors ${active ? 'bg-black text-white' : 'text-muted hover:text-black'}`}
                aria-pressed={active}
                aria-label={`Show prices in ${c.name}`}
              >
                {c.code}
              </button>
            )
          })}
        </Reveal>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, i) => {
            const highlighted = tier.highlighted
            const isCustom = tier.priceUSD === null
            return (
              <Reveal key={tier.id} delay={i * 0.06}>
                <div
                  data-hover
                  className={`relative p-10 flex flex-col h-full ${
                    highlighted
                      ? 'bg-black text-white border border-black'
                      : 'bg-white border border-rule hover:border-black transition-colors'
                  }`}
                >
                  {highlighted && (
                    <div className="absolute -top-3 left-10 bg-white text-black font-mono text-[11px] uppercase tracking-widest px-3 py-1">
                      Most popular
                    </div>
                  )}
                  <div className={`font-mono text-[11px] uppercase tracking-widest ${highlighted ? 'text-gray-500' : 'text-gray-400'}`}>{tier.tag}</div>
                  <div className="mt-3 font-bold text-3xl">{tier.name}</div>
                  <div className="mt-6 flex items-baseline gap-1">
                    {isCustom ? (
                      <span className="font-mono font-bold text-5xl tracking-tight">Custom</span>
                    ) : (
                      <>
                        <span className={`font-mono text-sm ${highlighted ? 'text-gray-400' : 'text-muted'}`}>{currency.symbol}</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${tier.id}-${currency.code}`}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="font-mono font-bold text-5xl tracking-tight"
                          >
                            {formatPrice(tier.priceUSD, currency)}
                          </motion.span>
                        </AnimatePresence>
                        <span className={`text-sm ${highlighted ? 'text-gray-500' : 'text-gray-400'}`}>{tier.period}</span>
                      </>
                    )}
                  </div>
                  <ul className={`mt-8 space-y-3 text-sm flex-1 ${highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex gap-3">
                        <Check size={16} strokeWidth={2} className={`mt-[2px] shrink-0 ${highlighted ? 'text-white' : 'text-black'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <MagneticButton
                    href={tier.cta.href}
                    strength={0.15}
                    className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 transition-colors text-sm ${
                      highlighted
                        ? 'bg-white text-black hover:bg-gray-200'
                        : 'border border-black text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {tier.cta.label} →
                  </MagneticButton>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 text-gray-400 text-sm max-w-2xl">
          Pro will be $5–10/month depending on jurisdiction. Pricing calibrated to local purchasing power — not global averages. Currency conversions above are indicative.
        </Reveal>
      </div>
    </section>
  )
}
