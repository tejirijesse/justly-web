import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import { platforms } from '../data'

export default function Platforms() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">04 — Access</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Three ways in. Zero barriers.</h2>
        </Reveal>
        <Reveal className="mt-8 text-muted max-w-2xl text-lg">
          No download required to begin. No account required to ask your first question.
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {platforms.map((c, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div
                data-hover
                className="bg-white border border-rule hover:border-black transition-colors p-10 h-full"
              >
                <Icon name={c.icon} />
                <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-gray-400">{c.tag}</div>
                <h3 className="mt-2 font-bold text-2xl md:text-3xl">{c.title}</h3>
                <p className="mt-4 text-muted leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
