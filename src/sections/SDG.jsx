import Reveal from '../ui/Reveal'
import { sdgs } from '../data'

export default function SDG() {
  return (
    <section id="sdg" className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">06 — SDG Commitments</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          <h2>
            Measured against the goals<br />
            <span className="text-gray-400">that matter.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-8 text-muted max-w-2xl text-lg">
          Justly is a social enterprise. Every decision is weighed against the UN Sustainable Development Goals most directly shaped by legal access.
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sdgs.map((g, i) => (
            <Reveal key={g.n} delay={i * 0.05}>
              <div
                data-hover
                className="bg-white border border-rule hover:border-black transition-colors p-10 h-full"
              >
                <div className="font-mono font-bold text-5xl tracking-tight">{g.n}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-gray-400">{g.label}</div>
                <h3 className="mt-4 font-bold text-xl">{g.title}</h3>
                <p className="mt-4 text-muted leading-relaxed text-sm">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
