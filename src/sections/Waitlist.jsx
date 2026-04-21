import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from '../ui/Reveal'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = e => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          <h2>
            13,000 people are already waiting.<br />
            <span className="text-gray-500">Be one of them.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-8 text-gray-400 max-w-2xl text-lg leading-relaxed">
          Get early access to free legal guidance, evidence tools, and verified legal counsel the moment we launch in your country.
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={submitted}
              aria-label="Email address"
              className="flex-1 bg-black text-white border border-white/40 focus:border-white outline-none rounded-full px-6 py-3.5 placeholder-gray-500 transition-colors"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              data-hover
              className="rounded-full bg-white text-black px-7 py-3.5 font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2 min-w-[170px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {submitted ? (
                  <motion.span key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                    <Check size={16} /> You&rsquo;re in.
                  </motion.span>
                ) : (
                  <motion.span key="go" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    Join Waitlist
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </Reveal>
        <Reveal className="mt-6 text-gray-500 text-sm">
          Free to start. No spam. No obligation. Just early access to something that matters.
        </Reveal>
      </div>
    </section>
  )
}
