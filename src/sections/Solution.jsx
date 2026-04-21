import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import { solutionCards } from '../data'

export default function Solution() {
  return (
    <section id="product" className="bg-mist">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-400">02 — The Platform</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          <h2>Four layers. One infrastructure.<br />Zero friction.</h2>
        </Reveal>
        <Reveal className="mt-8 text-muted max-w-2xl text-lg">
          Justly is not a chatbot. It does not give generic advice. It builds your case — from first message to legal resolution.
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {solutionCards.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                data-hover
                className="group relative bg-white border border-rule hover:border-black transition-colors p-10 pl-12 h-full"
              >
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <Icon name={it.icon} />
                <h3 className="mt-6 font-bold text-2xl md:text-3xl">{it.title}</h3>
                <p className="mt-4 text-muted leading-relaxed">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
