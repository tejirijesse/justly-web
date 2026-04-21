import { useTilt } from '../hooks'

/**
 * Subtle 3D-tilt wrapper. Children tilt based on cursor position.
 * Use `max` to control degrees; keep modest (default 5) for editorial restraint.
 */
export default function TiltCard({ max = 5, className = '', children, ...rest }) {
  const ref = useTilt(max)
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  )
}
