import type { CSSProperties } from 'react'

const ITEMS: { label: string; dot: CSSProperties }[] = [
  { label: 'Done', dot: { background: 'var(--done)' } },
  { label: 'In progress', dot: { background: 'var(--accent)' } },
  { label: 'Blocked', dot: { background: 'var(--blocked)' } },
  { label: 'To do', dot: { background: 'transparent', border: '1.3px solid var(--text-dim)' } },
]

export function Legend() {
  return (
    <div className="mb-10 flex flex-wrap gap-x-9 gap-y-2.5">
      {ITEMS.map((item) => (
        <span
          key={item.label}
          className="flex items-center gap-[9px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-dim)' }}
        >
          <span className="h-[7px] w-[7px] flex-none rounded-full" style={item.dot} />
          {item.label}
        </span>
      ))}
    </div>
  )
}
