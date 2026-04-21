import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor with:
 *  - A small dot that follows the pointer exactly
 *  - A ring that trails with a slight lag and expands over interactive targets
 *  - Morphs into a small label when hovering elements with data-cursor="<label>"
 */
export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)

    let tx = 0, ty = 0, rx = 0, ry = 0
    let raf
    const onMove = e => { tx = e.clientX; ty = e.clientY }
    const onOver = e => {
      const t = e.target?.closest?.('a, button, input, select, [data-hover], [data-cursor]')
      if (t) {
        setHovering(true)
        const lbl = t.getAttribute('data-cursor')
        setLabel(lbl || '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }
    const loop = () => {
      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = tx + 'px'
        dotRef.current.style.top = ty + 'px'
      }
      // ring trails
      rx += (tx - rx) * 0.22
      ry += (ty - ry) * 0.22
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  const ringSize = label ? 72 : hovering ? 40 : 28
  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[100] rounded-full border border-black"
        style={{
          mixBlendMode: 'difference',
          left: -100, top: -100,
          width: ringSize, height: ringSize,
          transform: 'translate(-50%, -50%)',
          transition: 'width .22s ease, height .22s ease',
          background: hovering || label ? '#000' : 'transparent'
        }}
      >
        {label && (
          <span
            ref={labelRef}
            className="absolute inset-0 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-white whitespace-nowrap"
          >
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[101] rounded-full bg-black"
        style={{
          mixBlendMode: 'difference',
          left: -100, top: -100,
          width: 6, height: 6,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}
