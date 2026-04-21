import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useReveal — IntersectionObserver-backed reveal. Adds .shown once the element
 * enters the viewport. Pairs with CSS that sets opacity 0 + translate initially.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { setShown(true); io.unobserve(e.target) }
      })
    }, { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '-60px' })
    io.observe(el)
    return () => io.disconnect()
  }, [options.threshold, options.rootMargin])
  return [ref, shown]
}

/**
 * useMousePosition — raw mouse tracking with optional throttle.
 */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const onMove = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return pos
}

/**
 * useMagnetic — pulls an element toward the cursor when hovered. Returns a ref
 * to attach to the element. `strength` controls the pull factor (0.25 = subtle).
 */
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = e => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0, 0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])
  return ref
}

/**
 * useTilt — 3D tilt on a card based on cursor position. Subtle by default.
 */
export function useTilt(max = 6) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transformStyle = 'preserve-3d'
    el.style.transition = 'transform .15s ease-out'
    const onMove = e => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = (py - 0.5) * -2 * max
      const ry = (px - 0.5) *  2 * max
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
    }
    const onLeave = () => { el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])
  return ref
}

/**
 * useScrollDirection — 'up' or 'down'. Used by Nav to hide on scroll down.
 */
export function useScrollDirection(threshold = 120) {
  const [dir, setDir] = useState('up')
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < 8)
      if (Math.abs(y - last) < 4) return
      setDir(y > last && y > threshold ? 'down' : 'up')
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return { dir, atTop }
}

/**
 * useScrollProgress — 0..1 fraction scrolled through the page.
 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? window.scrollY / h : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return p
}

/**
 * useActiveSection — returns the id of the section currently closest to the
 * top of the viewport. Used to highlight the active link in Nav.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || '')
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120 // account for nav+marquee
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

/**
 * useCountUp — eased count-up animation triggered once when visible.
 */
export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || started.current) return
        started.current = true
        const start = performance.now()
        const tick = now => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(target * eased)
          if (t < 1) requestAnimationFrame(tick)
          else setValue(target)
        }
        requestAnimationFrame(tick)
        io.unobserve(el)
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  const display = decimals > 0
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString()
  return [ref, display]
}
