import Reveal from '../ui/Reveal'
import Counter from '../ui/Counter'

export default function NumberBand() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
        <Reveal className="px-2 md:px-10 py-10 md:py-0 flex flex-col justify-center">
          <div className="font-mono font-bold text-6xl md:text-7xl tracking-tight">
            <Counter to={4.5} decimals={1} />B
          </div>
          <div className="mt-4 text-gray-400 text-sm">People with no legal access</div>
        </Reveal>
        <Reveal className="px-2 md:px-10 py-10 md:py-0 flex flex-col justify-center">
          <div className="font-mono font-bold text-6xl md:text-7xl tracking-tight">
            $<Counter to={37} />B
          </div>
          <div className="mt-4 text-gray-400 text-sm">Legal tech market today</div>
        </Reveal>
        <Reveal className="px-2 md:px-10 py-10 md:py-0 flex flex-col justify-center">
          <div className="font-mono font-bold text-6xl md:text-7xl tracking-tight">
            <Counter to={13} />K
          </div>
          <div className="mt-4 text-gray-400 text-sm">On our waitlist. Zero paid ads.</div>
        </Reveal>
      </div>
    </section>
  )
}
