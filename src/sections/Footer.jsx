import { Instagram, Twitter, Linkedin, Youtube, Music2 } from 'lucide-react'
import { footerCols } from '../data'

const socials = [
  { name: 'Instagram', Icon: Instagram },
  { name: 'X',         Icon: Twitter },
  { name: 'LinkedIn',  Icon: Linkedin },
  { name: 'TikTok',    Icon: Music2 },
  { name: 'YouTube',   Icon: Youtube }
]

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 grid md:grid-cols-6 gap-12">
        <div className="md:col-span-2">
          <div className="font-bold tracking-[0.28em] text-sm">JUSTLY</div>
          <div className="mt-4 text-gray-500 text-sm">Your rights. Secured.</div>
        </div>
        {footerCols.map((c, i) => (
          <div key={i}>
            <div className="font-mono text-[11px] uppercase tracking-widest text-gray-500">{c.h}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-500">
          <div>© 2026 Justly Limited · Nigeria · Uganda · legal@getjustly.org</div>
          <div className="flex items-center gap-4">
            {socials.map(s => (
              <a key={s.name} href="#" aria-label={s.name} className="hover:text-white transition-colors">
                <s.Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
