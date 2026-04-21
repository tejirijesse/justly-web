import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

/**
 * Drop-in wrapper that fades the child up on first entry into the viewport.
 * Pass `delay` for staggered reveals.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {typeof Tag === 'string' ? children : <Tag>{children}</Tag>}
    </motion.div>
  )
}
