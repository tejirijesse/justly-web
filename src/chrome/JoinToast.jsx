import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'
import { joinFeed } from '../data'

/**
 * Rotates through mock waitlist-join notifications every ~15s. First one
 * appears after a short delay. Auto-dismisses. No real-time data — purely
 * decorative social proof.
 */
export default function JoinToast() {
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    let i = 0
    let timer
    const show = () => {
      setCurrent({ ...joinFeed[i % joinFeed.length], key: i })
      i += 1
      timer = setTimeout(() => {
        setCurrent(null)
        timer = setTimeout(show, 9000 + Math.random() * 8000)
      }, 5200)
    }
    const first = setTimeout(show, 6000)
    return () => { clearTimeout(first); clearTimeout(timer) }
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-[78] pointer-events-none">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-white border border-black px-4 py-3 flex items-center gap-3 max-w-[320px]"
          >
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <UserPlus size={14} />
            </div>
            <div className="text-sm">
              <div className="font-medium">{current.name} <span className="font-normal text-muted">· {current.city}</span></div>
              <div className="text-xs text-muted">{current.text}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
