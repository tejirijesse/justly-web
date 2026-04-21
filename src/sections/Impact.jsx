import Reveal from '../ui/Reveal'
import { founders } from '../data'

export default function Impact() {
  return (
    <section id="impact" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <Reveal className="font-mono text-xs uppercase tracking-widest text-gray-500">05 — Why We Exist</Reveal>
        <Reveal className="mt-6 font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          <h2>
            Justice is not a privilege.<br />
            It is a right.<br />
            <span className="text-gray-500">We are building the infrastructure to make that true.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-10 text-gray-400 max-w-3xl text-lg leading-relaxed">
          Justly is a social enterprise. Every product decision is measured against one question: does this make justice more accessible for someone who had none? We are pre-seed, pre-revenue, and pre-launch — with 13,000 people already waiting. That tells us everything we need to know about the size of this problem.
        </Reveal>

        <div id="company" className="mt-16 grid md:grid-cols-2 gap-6">
          {founders.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                data-hover
                className="border border-gray-800 hover:border-white transition-colors p-10 h-full"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="font-bold text-3xl">{p.name}</div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">{p.role}</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-white text-black font-bold flex items-center justify-center">
                    {p.name[0]}
                  </div>
                </div>
                <div className="mt-8 text-gray-400">{p.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
