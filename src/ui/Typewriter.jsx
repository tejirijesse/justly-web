import { useEffect, useState } from 'react'

/**
 * Cycles through an array of strings with a typing → holding → deleting
 * animation. Inline-safe — wrap in any element.
 */
export default function Typewriter({ words, typingSpeed = 70, deletingSpeed = 35, hold = 1600 }) {
  const [idx, setIdx] = useState(0)
  const [shown, setShown] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[idx]
    let t
    if (phase === 'typing') {
      if (shown.length < word.length) t = setTimeout(() => setShown(word.slice(0, shown.length + 1)), typingSpeed)
      else t = setTimeout(() => setPhase('holding'), hold)
    } else if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), 400)
    } else if (phase === 'deleting') {
      if (shown.length > 0) t = setTimeout(() => setShown(word.slice(0, shown.length - 1)), deletingSpeed)
      else { setPhase('typing'); setIdx((idx + 1) % words.length) }
    }
    return () => clearTimeout(t)
  }, [shown, phase, idx, words, typingSpeed, deletingSpeed, hold])

  return (
    <span aria-live="polite">
      {shown}
      <span
        className="inline-block w-[0.08em] bg-black align-baseline ml-1 animate-blink"
        style={{ height: '0.85em' }}
      />
    </span>
  )
}
