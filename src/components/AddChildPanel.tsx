import { useEffect, useRef, useState } from 'react'

interface AddChildPanelProps {
  parentTitle: string
  onConfirm: (title: string) => void
  onCancel: () => void
}

export function AddChildPanel({ parentTitle, onConfirm, onCancel }: AddChildPanelProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function submit() {
    if (!value.trim()) return
    onConfirm(value)
  }

  return (
    <div
      className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-lg border px-4 py-3"
      style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}
    >
      <span
        className="whitespace-nowrap"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}
      >
        Add under <span style={{ color: 'var(--text-muted)' }}>{parentTitle}</span>
      </span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit()
          if (e.key === 'Escape') onCancel()
        }}
        placeholder="Task or sub-goal title"
        className="rounded border px-2.5 py-1.5 outline-none"
        style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--text)', fontSize: 13, width: 220 }}
      />
      <button
        type="button"
        onClick={submit}
        className="rounded-full border px-3 py-1.5"
        style={{ borderColor: 'var(--accent)', color: 'var(--accent)', fontSize: 12, fontWeight: 600 }}
      >
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full border px-3 py-1.5"
        style={{ borderColor: 'var(--line-soft)', color: 'var(--text-dim)', fontSize: 12 }}
      >
        Cancel
      </button>
    </div>
  )
}
