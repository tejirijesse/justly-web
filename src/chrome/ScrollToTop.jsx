import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollDirection } from '../hooks'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const { atTop } = useScrollDirection()
  const [visible, setVisible] = useState(false)
  useEffect(() => { setVisible(!atTop) }, [atTop])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scrolltop"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          data-cursor="top"
          className="fixed bottom-6 right-6 z-[78] rounded-full bg-black text-white p-3 border border-black hover:bg-white hover:text-black transition-colors shadow-none"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
