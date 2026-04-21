import { useEffect, useRef, useState } from 'react'
import { terminalLines, terminalCommands } from '../data'

/**
 * Interactive terminal. Progressively reveals the scripted demo lines, then
 * accepts commands from the user. Supported commands: `help`, `jurisdictions`,
 * `case`, `pricing`, `clear`. Unknown input echoes a friendly error.
 */
export default function TerminalCard() {
  const [lines, setLines] = useState([])
  const [value, setValue] = useState('')
  const [ready, setReady] = useState(false)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  // Initial scripted reveal
  useEffect(() => {
    let cancelled = false
    const reveal = async () => {
      for (let i = 0; i < terminalLines.length; i++) {
        await new Promise(r => setTimeout(r, 420))
        if (cancelled) return
        setLines(prev => [...prev, { kind: 'out', text: terminalLines[i] }])
      }
      if (!cancelled) {
        setLines(prev => [...prev, { kind: 'hint', text: 'type `help` to explore' }])
        setReady(true)
      }
    }
    reveal()
    return () => { cancelled = true }
  }, [])

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const run = cmd => {
    const trimmed = cmd.trim()
    if (!trimmed) return
    setLines(prev => [...prev, { kind: 'in', text: `> ${trimmed}` }])
    const key = trimmed.toLowerCase()
    if (key === 'clear') { setLines([]); return }
    const out = terminalCommands[key]
    if (out) {
      out.forEach((text, i) => {
        setTimeout(() => {
          setLines(prev => [...prev, { kind: 'out', text }])
        }, 120 * (i + 1))
      })
    } else {
      setLines(prev => [...prev, { kind: 'err', text: `unknown command — try \`help\`` }])
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    run(value)
    setValue('')
  }

  return (
    <div
      className="border border-black bg-white p-6 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 pb-4 border-b border-rule">
        <div className="w-2.5 h-2.5 rounded-full bg-black" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="ml-3 text-xs text-muted tracking-widest uppercase">justly.terminal</div>
      </div>
      <div ref={bodyRef} className="pt-5 space-y-2 min-h-[220px] max-h-[280px] overflow-y-auto">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.kind === 'err'  ? 'text-muted' :
              l.kind === 'in'   ? 'text-black font-semibold' :
              l.kind === 'hint' ? 'text-muted italic' :
                                  'text-black'
            }
          >
            {l.text}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex items-center pt-1">
          <span className="text-black">{'>'}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={ready ? 'help' : ''}
            aria-label="Terminal input"
            className="ml-2 flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-gray-300"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="inline-block w-2 h-4 bg-black animate-blink" />
        </form>
      </div>
    </div>
  )
}
