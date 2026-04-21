import { useCountUp } from '../hooks'

/**
 * Count-up number. Animates once when scrolled into view.
 *   <Counter to={13000} suffix="+" />
 *   <Counter to={4.5} decimals={1} suffix="B" />
 */
export default function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 1800, className = '' }) {
  const [ref, display] = useCountUp(to, { duration, decimals })
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>
}
