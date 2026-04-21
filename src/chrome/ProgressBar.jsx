import { useScrollProgress } from '../hooks'

export default function ProgressBar() {
  const p = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[95] h-[2px] bg-black origin-left will-change-transform"
      style={{ transform: `scaleX(${p})`, transition: 'transform .05s linear' }}
    />
  )
}
