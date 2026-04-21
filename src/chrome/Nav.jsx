import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { navLinks } from '../data'
import { useScrollDirection, useActiveSection } from '../hooks'
import MagneticButton from '../ui/MagneticButton'

const SECTION_IDS = ['mission', 'product', 'impact', 'pricing', 'company']

export default function Nav() {
  const { dir } = useScrollDirection()
  const active = useActiveSection(SECTION_IDS)
  const hidden = dir === 'down'

  return (
    <motion.nav
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[80] bg-white border-b border-rule"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" data-cursor="top" className="font-bold tracking-[0.28em] text-sm">JUSTLY</a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map(l => {
            const id = l.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative transition-colors ${isActive ? 'text-black' : 'text-muted hover:text-black'}`}
              >
                {l.label}
                <span
                  className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-black transition-transform origin-left"
                  style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </a>
            )
          })}
        </div>
        <MagneticButton href="#waitlist" className="inline-flex items-center gap-2 rounded-full bg-black text-white text-sm px-5 py-2.5 hover:bg-white hover:text-black border border-black transition-colors">
          Get Early Access
          <ArrowRight size={14} />
        </MagneticButton>
      </div>
    </motion.nav>
  )
}
