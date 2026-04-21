import Reveal from '../ui/Reveal'
import { howItWorks } from '../data'

export default function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">03 — How It Works</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Three steps. Any device. Any situation.</h2>
        </Reveal>
        <div className="mt-20 relative grid md:grid-cols-3 gap-12">
          <div className="hidden md:block absolute top-5 left-[8%] right-[8%] h-px bg-rule" />
          {howItWorks.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="relative">
              <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-mono text-xs">
                {s.n}
              </div>
              <h3 className="mt-6 font-bold text-2xl md:text-3xl">{s.t}</h3>
              <p className="mt-4 text-muted leading-relaxed">{s.b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
