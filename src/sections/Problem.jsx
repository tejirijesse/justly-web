import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import { problemStats } from '../data'

export default function Problem() {
  return (
    <section id="problem" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">01 — The Problem</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          <h2>
            The justice gap is not a funding problem.<br />
            <span className="text-gray-400">It is an infrastructure problem.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-10 text-muted max-w-3xl text-lg leading-relaxed">
          Courts exist. Lawyers exist. Laws exist. But for most people in Nigeria, Kenya, Ghana, Uganda, and Rwanda — the system is inaccessible in language, cost, geography, and design. One hour with a lawyer costs more than a week of wages. Legal processes are built for professionals, not people. And the gap keeps growing.
        </Reveal>
        <Reveal className="mt-6 text-black font-medium max-w-3xl text-lg">
          Infrastructure fixes that. We are building the infrastructure.
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {problemStats.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <TiltCard className="border border-rule hover:border-black transition-colors p-8" data-hover>
                <div className="font-mono font-bold text-5xl tracking-tight">{s.n}</div>
                <div className="mt-6 text-muted leading-relaxed">{s.body}</div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
