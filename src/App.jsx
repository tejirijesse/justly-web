import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import {
  ArrowRight, ArrowDown, Check, Plus, Minus, MessageCircle,
  Smartphone, Monitor, Shield, FileLock2, Users, ClipboardList,
  Instagram, Linkedin, Twitter, Youtube, Music2
} from 'lucide-react'

/* ---------------- utilities ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

function useInViewOnce() {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once: true, margin: '-80px' },
    variants: fadeUp
  }
}

/* ---------------- cursor follower ---------------- */

function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const t = e.target
      if (t.closest('a, button, input, [data-hover]')) setHovering(true)
      else setHovering(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] rounded-full bg-black mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 36 : 10,
          height: hovering ? 36 : 10,
          transform: 'translate(-50%, -50%)',
          transition: 'width 180ms ease, height 180ms ease'
        }}
      />
      <div
        className="pointer-events-none fixed z-[99] rounded-full bg-black mix-blend-difference opacity-40"
        style={{
          left: pos.x,
          top: pos.y,
          width: 4,
          height: 4,
          transform: 'translate(-50%, -50%)',
          transition: 'left 220ms ease-out, top 220ms ease-out'
        }}
      />
    </>
  )
}

/* ---------------- progress bar ---------------- */

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[90] h-[2px] bg-black origin-left"
      style={{ scaleX: x }}
    />
  )
}

/* ---------------- nav ---------------- */

function Nav({ onWaitlist }) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > 120 && y > lastY.current) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[80] bg-white border-b border-gray-200"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-bold tracking-[0.28em] text-sm">JUSTLY</a>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#mission" className="hover:text-black text-gray-600 transition-colors">Mission</a>
          <a href="#product" className="hover:text-black text-gray-600 transition-colors">Product</a>
          <a href="#impact" className="hover:text-black text-gray-600 transition-colors">Impact</a>
          <a href="#company" className="hover:text-black text-gray-600 transition-colors">Company</a>
        </div>
        <button
          onClick={onWaitlist}
          className="group inline-flex items-center gap-2 rounded-full bg-black text-white text-sm px-5 py-2.5 hover:bg-white hover:text-black border border-black transition-colors"
        >
          Get Early Access
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.nav>
  )
}

/* ---------------- marquee ---------------- */

function Marquee() {
  const items = [
    'YOUR RIGHTS', 'SECURED', '13,000 PEOPLE WAITING', 'JUSTICE FOR ALL',
    'BUILT FOR AFRICA', '4.5 BILLION UNSERVED', 'LEGAL INFRASTRUCTURE',
    'PRE-SEED', '$500K RAISE'
  ]
  const line = items.join(' · ') + ' · '
  return (
    <div className="fixed top-16 left-0 right-0 z-[70] bg-black text-white overflow-hidden border-b border-black">
      <div className="marquee-track py-2 text-xs font-mono tracking-widest">
        <span className="px-4 whitespace-nowrap">{line.repeat(4)}</span>
        <span className="px-4 whitespace-nowrap" aria-hidden="true">{line.repeat(4)}</span>
      </div>
    </div>
  )
}

/* ---------------- typewriter ---------------- */

function Typewriter({ words, className = '' }) {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[idx]
    let t
    if (phase === 'typing') {
      if (shown.length < word.length) {
        t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), 70)
      } else {
        t = setTimeout(() => setPhase('holding'), 1600)
      }
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), 400)
    } else if (phase === 'deleting') {
      if (shown.length > 0) {
        t = setTimeout(() => setShown(word.slice(0, shown.length - 1)), 35)
      } else {
        setPhase('typing')
        setIdx((idx + 1) % words.length)
      }
    }
    return () => clearTimeout(t)
  }, [shown, phase, idx, words])

  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[0.08em] bg-black align-baseline ml-1 animate-blink" style={{ height: '0.85em' }} />
    </span>
  )
}

/* ---------------- counter ---------------- */

function Counter({ to, suffix = '', prefix = '', duration = 1800, decimals = 0 }) {
  const [val, setVal] = useState(0)
  const raf = useRef(0)
  const started = useRef(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(to * eased)
            if (p < 1) raf.current = requestAnimationFrame(tick)
          }
          raf.current = requestAnimationFrame(tick)
        }
      })
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf.current) }
  }, [to, duration])

  const display = decimals > 0
    ? val.toFixed(decimals)
    : Math.floor(val).toLocaleString()

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

/* ---------------- hero ---------------- */

function Hero({ onWaitlist }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-8">
            Legal Infrastructure — Africa — 2026
          </motion.div>
          <motion.h1
            {...useInViewOnce()}
            className="font-bold text-5xl md:text-7xl leading-[1.02] tracking-tight"
          >
            The Legal System <br />
            Was Never Built for <br />
            <Typewriter words={['Everyone.', 'Africa.', 'The Forgotten.', 'You.']} />
          </motion.h1>
          <motion.p
            {...useInViewOnce()}
            className="mt-8 text-gray-500 max-w-lg text-lg leading-relaxed"
          >
            Justly is the digital infrastructure closing the access to justice gap — for the 4.5 billion people courts, lawyers, and legal systems were never designed to serve.
          </motion.p>
          <motion.div {...useInViewOnce()} className="mt-10 flex flex-wrap items-center gap-6">
            <button
              onClick={onWaitlist}
              className="group inline-flex items-center gap-2 rounded-full bg-black text-white px-7 py-3.5 hover:bg-white hover:text-black border border-black transition-colors"
            >
              Get Early Access
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href="#problem" className="inline-flex items-center gap-2 underline underline-offset-4 decoration-1 hover:decoration-2">
              See How It Works <ArrowDown size={14} />
            </a>
          </motion.div>
          <motion.div {...useInViewOnce()} className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold">
                <Counter to={13000} suffix="+" />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-gray-400 font-mono">People on waitlist</div>
            </div>
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold">
                <Counter to={5} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-gray-400 font-mono">Countries</div>
            </div>
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold">
                <Counter to={4.5} decimals={1} suffix="B" />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-gray-400 font-mono">Unserved globally</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...useInViewOnce()}
          className="lg:col-span-5"
        >
          <TerminalCard />
        </motion.div>
      </div>
    </section>
  )
}

function TerminalCard() {
  const lines = [
    { t: '> Describing situation...', delay: 300 },
    { t: '> Jurisdiction: Nigeria ✓', delay: 900 },
    { t: '> Rights identified: 3', delay: 1500 },
    { t: '> Evidence secured ✓', delay: 2100 },
    { t: '> Lawyer matched ✓', delay: 2700 },
    { t: '> Status: Case active', delay: 3300 }
  ]
  const [shown, setShown] = useState(0)
  useEffect(() => {
    const timers = lines.map((_, i) =>
      setTimeout(() => setShown(v => Math.max(v, i + 1)), 400 * (i + 1))
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div data-hover className="border border-black bg-white p-6 font-mono text-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-black" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="ml-3 text-xs text-gray-400 tracking-widest uppercase">justly.terminal</div>
      </div>
      <div className="pt-5 space-y-2 min-h-[220px]">
        {lines.slice(0, shown).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="text-black"
          >
            {l.t}
          </motion.div>
        ))}
        <div className="flex items-center pt-1">
          <span className="text-black">{'>'} </span>
          <span className="ml-2 inline-block w-2 h-4 bg-black animate-blink" />
        </div>
      </div>
    </div>
  )
}

/* ---------------- number band ---------------- */

function NumberBand() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
        {[
          { n: <><Counter to={4.5} decimals={1} />B</>, label: 'People with no legal access' },
          { n: <><Counter to={37} prefix="$" />B</>, label: 'Legal tech market today' },
          { n: <><Counter to={13} />K</>, label: 'On our waitlist. Zero paid ads.' }
        ].map((s, i) => (
          <motion.div
            key={i}
            {...useInViewOnce()}
            className="px-2 md:px-10 py-10 md:py-0 flex flex-col justify-center"
          >
            <div className="font-mono font-bold text-6xl md:text-7xl tracking-tight">{s.n}</div>
            <div className="mt-4 text-gray-400 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- problem ---------------- */

function Problem() {
  return (
    <section id="problem" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          01 — The Problem
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          The justice gap is not a funding problem. <br />
          <span className="text-gray-400">It is an infrastructure problem.</span>
        </motion.h2>
        <motion.p {...useInViewOnce()} className="mt-10 text-gray-500 max-w-3xl text-lg leading-relaxed">
          Courts exist. Lawyers exist. Laws exist. But for most people in Nigeria, Kenya, Ghana, Uganda, and Rwanda — the system is inaccessible in language, cost, geography, and design. One hour with a lawyer costs more than a week of wages. Legal processes are built for professionals, not people. And the gap keeps growing.
        </motion.p>
        <motion.p {...useInViewOnce()} className="mt-6 text-black font-medium max-w-3xl text-lg">
          Infrastructure fixes that. We are building the infrastructure.
        </motion.p>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { n: '70%', label: 'of Africans face at least one civil legal problem per year' },
            { n: '3%', label: 'can access meaningful legal representation' },
            { n: '$0', label: 'is what Justly costs to start' }
          ].map((s, i) => (
            <motion.div
              key={i}
              {...useInViewOnce()}
              data-hover
              className="border border-gray-200 hover:border-black transition-colors p-8"
            >
              <div className="font-mono font-bold text-5xl tracking-tight">{s.n}</div>
              <div className="mt-6 text-gray-500 leading-relaxed">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- solution ---------------- */

function Solution() {
  const items = [
    {
      icon: Shield,
      title: 'AI Legal Intelligence',
      body: 'Jurisdiction-specific legal guidance across Nigeria, Kenya, Ghana, Uganda, and Rwanda. Plain language. Instant. Calibrated to your exact situation — not a general answer.'
    },
    {
      icon: FileLock2,
      title: 'Encrypted Evidence Vault',
      body: 'Every photo, document, audio file, and video you submit is encrypted, timestamped, and chain-of-custody verified. It holds up in court. That is the point.'
    },
    {
      icon: Users,
      title: 'Verified Lawyer Network',
      body: 'Matched to verified counsel with your full case already prepared. No cold calls. No wasted consultations. No starting from zero.'
    },
    {
      icon: ClipboardList,
      title: 'Case Management',
      body: 'Every deadline, document, update, and next action in one place. For individuals, lawyers, and institutions — from first incident to final resolution.'
    }
  ]
  return (
    <section id="product" className="bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          02 — The Platform
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Four layers. One infrastructure. <br /> Zero friction.
        </motion.h2>
        <motion.p {...useInViewOnce()} className="mt-8 text-gray-500 max-w-2xl text-lg">
          Justly is not a chatbot. It does not give generic advice. It builds your case — from first message to legal resolution.
        </motion.p>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon
            return (
              <motion.div
                key={i}
                {...useInViewOnce()}
                data-hover
                className="group relative bg-white border border-gray-200 hover:border-black transition-colors p-10 pl-12"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <Icon size={22} strokeWidth={1.5} />
                <h3 className="mt-6 font-bold text-2xl md:text-3xl">{it.title}</h3>
                <p className="mt-4 text-gray-500 leading-relaxed">{it.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- how it works ---------------- */

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Describe', b: 'Open Justly on WhatsApp, mobile, or browser. Describe what happened in plain language. No forms. No legal training required.' },
    { n: '02', t: 'Understand', b: 'Justly identifies your rights, your options, and your next steps — calibrated to your country, your case, and your circumstances.' },
    { n: '03', t: 'Act', b: 'Secure your evidence. Draft your documents. Connect to verified counsel. Your case is built. You are ready.' }
  ]
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          03 — How It Works
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Three steps. Any device. Any situation.
        </motion.h2>

        <div className="mt-20 relative grid md:grid-cols-3 gap-12">
          <div className="hidden md:block absolute top-5 left-[8%] right-[8%] h-px bg-gray-200" />
          {steps.map((s, i) => (
            <motion.div key={i} {...useInViewOnce()} className="relative">
              <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-mono text-xs">
                {s.n}
              </div>
              <h3 className="mt-6 font-bold text-2xl md:text-3xl">{s.t}</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">{s.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- platforms ---------------- */

function Platforms() {
  const cards = [
    { icon: MessageCircle, tag: 'Most accessible', title: 'WhatsApp', body: 'The channel already in every pocket. Send a message. Get legal guidance. Preserve evidence. All without leaving WhatsApp.' },
    { icon: Smartphone, tag: 'Full experience', title: 'Mobile App', body: 'iOS and Android. Real-time evidence capture. Case tracking. Lawyer communication. The full platform — in your pocket.' },
    { icon: Monitor, tag: 'For institutions', title: 'Web App', body: 'The complete infrastructure layer. For individuals managing complex matters, legal aid organisations, law firms, and courts operating at scale.' }
  ]
  return (
    <section className="bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          04 — Access
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Three ways in. Zero barriers.
        </motion.h2>
        <motion.p {...useInViewOnce()} className="mt-8 text-gray-500 max-w-2xl text-lg">
          No download required to begin. No account required to ask your first question.
        </motion.p>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={i}
                {...useInViewOnce()}
                data-hover
                className="bg-white border border-gray-200 hover:border-black transition-colors p-10"
              >
                <Icon size={22} strokeWidth={1.5} />
                <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-gray-400">{c.tag}</div>
                <h3 className="mt-2 font-bold text-2xl md:text-3xl">{c.title}</h3>
                <p className="mt-4 text-gray-500 leading-relaxed">{c.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- impact ---------------- */

function Impact() {
  return (
    <section id="impact" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-500">
          05 — Why We Exist
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          Justice is not a privilege. <br />
          It is a right. <br />
          <span className="text-gray-500">We are building the infrastructure to make that true.</span>
        </motion.h2>
        <motion.p {...useInViewOnce()} className="mt-10 text-gray-400 max-w-3xl text-lg leading-relaxed">
          Justly is a social enterprise. Every product decision is measured against one question: does this make justice more accessible for someone who had none? We are pre-seed, pre-revenue, and pre-launch — with 13,000 people already waiting. That tells us everything we need to know about the size of this problem.
        </motion.p>

        <div id="company" className="mt-16 grid md:grid-cols-2 gap-6">
          {[
            { name: 'Linda', role: 'Co-Founder & CEO', detail: 'Strategy, Fundraising, Partnerships' },
            { name: 'Ali', role: 'Co-Founder & CTO', detail: 'Product Architecture, Engineering' }
          ].map((p, i) => (
            <motion.div
              key={i}
              {...useInViewOnce()}
              data-hover
              className="border border-gray-800 hover:border-white transition-colors p-10"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- markets ---------------- */

function Markets() {
  const countries = [
    { flag: '🇳🇬', name: 'Nigeria' },
    { flag: '🇰🇪', name: 'Kenya' },
    { flag: '🇬🇭', name: 'Ghana' },
    { flag: '🇺🇬', name: 'Uganda' },
    { flag: '🇷🇼', name: 'Rwanda' }
  ]
  return (
    <section id="mission" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          06 — Markets
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Five countries. One legal infrastructure.
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-3">
          {countries.map((c, i) => (
            <motion.div
              key={i}
              {...useInViewOnce()}
              data-hover
              className="border border-gray-200 p-8 flex flex-col items-center justify-center gap-3 hover:bg-black hover:text-white transition-all"
            >
              <div className="text-4xl">{c.flag}</div>
              <div className="font-mono text-sm uppercase tracking-widest">{c.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.p {...useInViewOnce()} className="mt-10 text-gray-500 max-w-3xl text-lg leading-relaxed">
          Jurisdiction-specific legal logic in every market. Not generic guidance — locally calibrated, legally accurate, and actionable under the laws that apply to you.
        </motion.p>
      </div>
    </section>
  )
}

/* ---------------- traction ---------------- */

function Traction() {
  const stats = [
    { n: <Counter to={13000} />, label: 'Waitlist sign-ups' },
    { n: <>$<Counter to={0} /></>, label: 'Paid acquisition' },
    { n: <Counter to={5} />, label: 'Target markets' },
    { n: <Counter to={40} />, label: 'Partner organisations identified' }
  ]
  return (
    <section className="bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          07 — Traction
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Before launch. Before revenue. <br /> Before a single ad.
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} {...useInViewOnce()} className="border-t border-black pt-6">
              <div className="font-mono font-bold text-5xl md:text-6xl tracking-tight">{s.n}</div>
              <div className="mt-4 text-gray-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p {...useInViewOnce()} className="mt-12 text-gray-500 max-w-3xl text-lg leading-relaxed">
          We have built the brand, the content infrastructure, the financial model, the partner pipeline, and the waitlist. We are raising $500K pre-seed to build the product that matches the demand.
        </motion.p>

        <motion.a
          {...useInViewOnce()}
          href="#waitlist"
          className="mt-10 inline-flex items-center gap-2 underline underline-offset-4 decoration-1 hover:decoration-2"
        >
          View Investment Thesis <ArrowRight size={14} />
        </motion.a>
      </div>
    </section>
  )
}

/* ---------------- faq ---------------- */

function Faq() {
  const items = [
    { q: 'Is Justly free?', a: 'Basic access is free forever. Justly Pro — with full platform access, evidence vault, and lawyer matching — is $5–10/month. Less than one hour of legal consultation.' },
    { q: 'Is my information private?', a: 'Your legal matter remains confidential at every stage. End-to-end encrypted. No public records. No silent sharing. You control when and how your information is disclosed.' },
    { q: 'Do I need a smartphone?', a: 'No. WhatsApp works on basic phones. Partner organisations bridge access for users without any device. We designed for the lowest common denominator — deliberately.' },
    { q: 'Which countries are supported?', a: 'Nigeria, Kenya, Ghana, Uganda, and Rwanda at launch — with jurisdiction-specific legal intelligence in each market.' },
    { q: 'How is this different from ChatGPT?', a: 'ChatGPT gives information. Justly builds a case. The difference is infrastructure — evidence vault, verified lawyers, case continuity, and jurisdiction-specific legal logic. None of that exists in a general AI tool.' },
    { q: 'Are you raising funding?', a: 'Yes. We are raising a $500K pre-seed round. If you are an investor aligned with access to justice, legal tech, or African infrastructure — reach out.' }
  ]
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.div {...useInViewOnce()} className="font-mono text-xs uppercase tracking-widest text-gray-400">
          08 — FAQ
        </motion.div>
        <motion.h2 {...useInViewOnce()} className="mt-6 font-bold text-4xl md:text-6xl leading-tight">
          Straight answers.
        </motion.h2>

        <div className="mt-14 border-t border-gray-200">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <motion.div key={i} {...useInViewOnce()} className="border-b border-gray-200">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-hover
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group"
                >
                  <span className="font-bold text-xl md:text-2xl group-hover:translate-x-1 transition-transform">{it.q}</span>
                  <span className="mt-1 shrink-0">
                    {isOpen ? <Minus size={22} strokeWidth={1.5} /> : <Plus size={22} strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-500 max-w-3xl leading-relaxed">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- waitlist ---------------- */

function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28">
        <motion.h2 {...useInViewOnce()} className="font-bold text-4xl md:text-6xl leading-tight max-w-4xl">
          13,000 people are already waiting. <br />
          <span className="text-gray-500">Be one of them.</span>
        </motion.h2>
        <motion.p {...useInViewOnce()} className="mt-8 text-gray-400 max-w-2xl text-lg leading-relaxed">
          Get early access to free legal guidance, evidence tools, and verified legal counsel the moment we launch in your country.
        </motion.p>

        <motion.form
          {...useInViewOnce()}
          onSubmit={submit}
          className="mt-12 flex flex-col sm:flex-row gap-3 max-w-xl"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={submitted}
            className="flex-1 bg-black text-white border border-white/40 focus:border-white outline-none rounded-full px-6 py-3.5 placeholder-gray-500 transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="rounded-full bg-white text-black px-7 py-3.5 font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center gap-2 min-w-[170px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {submitted ? (
                <motion.span
                  key="ok"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Check size={16} /> You&rsquo;re in.
                </motion.span>
              ) : (
                <motion.span
                  key="go"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  Join Waitlist
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        <motion.p {...useInViewOnce()} className="mt-6 text-gray-500 text-sm">
          Free to start. No spam. No obligation. Just early access to something that matters.
        </motion.p>
      </div>
    </section>
  )
}

/* ---------------- footer ---------------- */

function Footer() {
  const cols = [
    { h: 'Platform', links: ['AI Guidance', 'Evidence Vault', 'Lawyer Matching', 'Case Tracking'] },
    { h: 'Access', links: ['WhatsApp', 'Mobile App', 'Web App'] },
    { h: 'Company', links: ['About', 'Mission', 'Partners', 'Careers', 'Press'] },
    { h: 'Legal', links: ['Privacy', 'Terms', 'Contact'] }
  ]
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 grid md:grid-cols-6 gap-12">
        <div className="md:col-span-2">
          <div className="font-bold tracking-[0.28em] text-sm">JUSTLY</div>
          <div className="mt-4 text-gray-500 text-sm">Your rights. Secured.</div>
        </div>
        {cols.map((c, i) => (
          <div key={i}>
            <div className="font-mono text-[11px] uppercase tracking-widest text-gray-500">{c.h}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l, j) => (
                <li key={j}>
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
            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={16} /></a>
            <a href="#" aria-label="X" className="hover:text-white"><Twitter size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={16} /></a>
            <a href="#" aria-label="TikTok" className="hover:text-white"><Music2 size={16} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- app ---------------- */

export default function App() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className="bg-white text-black">
      <ProgressBar />
      <CursorFollower />
      <Nav onWaitlist={scrollToWaitlist} />
      <Marquee />
      <div className="pt-24" />
      <Hero onWaitlist={scrollToWaitlist} />
      <NumberBand />
      <Problem />
      <Solution />
      <HowItWorks />
      <Platforms />
      <Impact />
      <Markets />
      <Traction />
      <Faq />
      <Waitlist />
      <Footer />
    </div>
  )
}
