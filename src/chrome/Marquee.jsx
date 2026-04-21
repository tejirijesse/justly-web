import { marqueeItems } from '../data'

export default function Marquee() {
  const line = marqueeItems.join(' · ') + ' · '
  const full = line.repeat(4)
  return (
    <div className="fixed top-16 left-0 right-0 z-[75] bg-black text-white overflow-hidden border-b border-black">
      <div className="marquee-track py-2 text-xs font-mono tracking-widest">
        <span className="px-4 whitespace-nowrap">{full}</span>
        <span className="px-4 whitespace-nowrap" aria-hidden="true">{full}</span>
      </div>
    </div>
  )
}
