import type { CSSProperties } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { GoalNode } from '../../types'

export type GoalFlowNodeData = {
  node: GoalNode
  onAddChild: (parentId: string) => void
  onCycleStatus: (id: string) => void
}

const STATUS_LABEL: Record<GoalNode['status'], string> = {
  done: 'Done',
  'in-progress': 'In progress',
  blocked: 'Blocked',
  todo: 'To do',
}

const TITLE_SIZE: Record<GoalNode['kind'], string> = {
  root: 'text-[19px] font-[650]',
  branch: 'text-[14.5px] font-semibold',
  leaf: 'text-[13px] font-semibold',
}

function dotStyle(status: GoalNode['status']): CSSProperties {
  if (status === 'todo') {
    return { background: 'transparent', border: '1.3px solid var(--text-dim)' }
  }
  const color = status === 'done' ? 'var(--done)' : status === 'blocked' ? 'var(--blocked)' : 'var(--accent)'
  return { background: color }
}

function labelColor(status: GoalNode['status']) {
  if (status === 'in-progress') return 'var(--accent)'
  if (status === 'blocked') return 'var(--blocked)'
  if (status === 'done') return 'var(--done)'
  return 'var(--text-dim)'
}

export function GoalNodeCard({ data }: NodeProps & { data: GoalFlowNodeData }) {
  const { node, onAddChild, onCycleStatus } = data
  const label = node.note ?? STATUS_LABEL[node.status]

  return (
    <div
      className="relative flex flex-col justify-center gap-2.5 rounded-lg border px-5 py-4"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--line)',
        width: node.kind === 'root' ? 300 : node.kind === 'branch' ? 220 : 170,
        minHeight: node.kind === 'root' ? 112 : 100,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <button
        type="button"
        onClick={() => onCycleStatus(node.id)}
        className={`nodrag nopan m-0 text-left leading-snug ${TITLE_SIZE[node.kind]}`}
        style={{ color: 'var(--text)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-display)' }}
        title="Click to cycle status"
      >
        {node.title}
      </button>

      <div className="flex items-center gap-[7px]" style={{ fontFamily: 'var(--font-mono)', fontSize: node.kind === 'root' ? 12 : 11 }}>
        <span className="h-[7px] w-[7px] flex-none rounded-full" style={dotStyle(node.status)} />
        <span style={{ color: labelColor(node.status) }}>{label}</span>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />

      <button
        type="button"
        onClick={() => onAddChild(node.id)}
        className="nodrag nopan absolute flex items-center justify-center rounded-full"
        aria-label={`Add a child under ${node.title}`}
        style={{
          left: '50%',
          bottom: -12,
          transform: 'translateX(-50%)',
          width: 24,
          height: 24,
          background: 'var(--bg)',
          border: '1.3px solid var(--accent)',
          color: 'var(--accent)',
          fontFamily: 'var(--font-display)',
          fontSize: 14,
          fontWeight: 600,
          lineHeight: 1,
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        +
      </button>
    </div>
  )
}
