import { useMagnetic } from '../hooks'

/**
 * A button or anchor that gently pulls toward the cursor on hover. Renders
 * as an `<a>` if `href` is provided, otherwise a `<button>`.
 */
export default function MagneticButton({
  href, onClick, children, className = '', strength = 0.2, ...rest
}) {
  const ref = useMagnetic(strength)
  const common = {
    ref,
    className: `transition-transform will-change-transform ${className}`,
    ...rest
  }
  return href ? (
    <a href={href} {...common}>{children}</a>
  ) : (
    <button type="button" onClick={onClick} {...common}>{children}</button>
  )
}
