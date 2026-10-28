import type { GoalNode, NodeKind, Status } from '../types'

const WIDTH: Record<NodeKind, number> = { root: 300, branch: 220, leaf: 170 }
const TIER_GAP = 260
const SIBLING_GAP = 50

export interface LaidOutNode extends GoalNode {
  x: number
  y: number
  width: number
}

export interface LaidOutEdge {
  id: string
  source: string
  target: string
  drivingStatus: Status
}

export function layoutTree(nodes: GoalNode[]): { laidOutNodes: LaidOutNode[]; edges: LaidOutEdge[] } {
  const childrenByParent = new Map<string, GoalNode[]>()
  let root: GoalNode | undefined
  for (const n of nodes) {
    if (n.parentId === null) {
      root = n
      continue
    }
    const siblings = childrenByParent.get(n.parentId) ?? []
    siblings.push(n)
    childrenByParent.set(n.parentId, siblings)
  }

  const positions = new Map<string, { x: number; y: number }>()
  const edges: LaidOutEdge[] = []
  let cursor = 0

  function place(node: GoalNode, depth: number): number {
    const children = childrenByParent.get(node.id) ?? []
    const y = depth * TIER_GAP

    if (children.length === 0) {
      const w = WIDTH[node.kind]
      const x = cursor + w / 2
      cursor += w + SIBLING_GAP
      positions.set(node.id, { x, y })
      return x
    }

    const childXs = children.map((child) => {
      const x = place(child, depth + 1)
      edges.push({
        id: `${node.id}->${child.id}`,
        source: node.id,
        target: child.id,
        drivingStatus: node.kind === 'root' ? child.status : node.status,
      })
      return x
    })

    const x = (childXs[0] + childXs[childXs.length - 1]) / 2
    positions.set(node.id, { x, y })
    return x
  }

  if (root) place(root, 0)

  const laidOutNodes: LaidOutNode[] = nodes.map((n) => {
    const pos = positions.get(n.id) ?? { x: 0, y: 0 }
    return { ...n, ...pos, width: WIDTH[n.kind] }
  })

  return { laidOutNodes, edges }
}
