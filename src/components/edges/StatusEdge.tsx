import { getBezierPath, Position, type EdgeProps } from '@xyflow/react'
import type { Status } from '../../types'

export type StatusEdgeData = { drivingStatus: Status }

function edgeColor(status: Status) {
  if (status === 'in-progress') return 'var(--accent)'
  if (status === 'blocked') return 'var(--blocked)'
  return 'var(--conn)'
}

export function StatusEdge({ sourceX, sourceY, targetX, targetY, data }: EdgeProps & { data: StatusEdgeData }) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Bottom,
    targetX,
    targetY,
    targetPosition: Position.Top,
    curvature: 0.65,
  })

  const status = data.drivingStatus
  const isBlocked = status === 'blocked'
  const isAccent = status === 'in-progress'

  return (
    <path
      d={path}
      fill="none"
      stroke={edgeColor(status)}
      strokeWidth={isAccent ? 1.8 : 1.4}
      strokeDasharray={isBlocked ? '4 5' : undefined}
    />
  )
}
