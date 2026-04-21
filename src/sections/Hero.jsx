import { ArrowRight, ArrowDown } from 'lucide-react'
import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'
import Typewriter from '../ui/Typewriter'
import TerminalCard from '../ui/TerminalCard'
import MagneticButton from '../ui/MagneticButton'
import { heroStats, typewriterWords } from '../data'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-8">
            Legal Infrastructure — Africa — 2026
          </Reveal>
          <Reveal className="font-bold text-5xl md:text-7xl leading-[1.02] tracking-tight">
            <h1>
              The Legal System<br />
              Was Never Built for<br />
              <Typewriter words={typewriterWords} />
            </h1>
          </Reveal>
          <Reveal className="mt-8 text-muted max-w-lg text-lg leading-relaxed">
            Justly is the digital infrastructure closing the access to justice gap — for the 4.5 billion people courts, lawyers, and legal systems were never designed to serve.
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton
              href="#waitlist"
              data-cursor="join"
              className="group inline-flex items-center gap-2 rounded-full bg-black text-white px-7 py-3.5 hover:bg-white hover:text-black border border-black transition-colors"
            >
              Get Early Access
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <a href="#problem" className="inline-flex items-center gap-2 underline underline-offset-4 decoration-1 hover:decoration-2">
              See How It Works <ArrowDown size={14} />
            </a>
          </Reveal>
          <Reveal className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
            {heroStats.map((s, i) => (
              <div key={i}>
                <div className="font-mono text-3xl md:text-4xl font-bold">
                  <Counter to={s.to} suffix={s.suffix || ''} decimals={s.decimals || 0} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-gray-400 font-mono">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5">
          <TerminalCard />
        </Reveal>
      </div>
    </section>
  )
}
