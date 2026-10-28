import { useEffect, useMemo, useState } from 'react'
import { ReactFlow, useReactFlow, type Edge, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useGoalTreeStore } from '../store/goalTreeStore'
import { layoutTree } from '../lib/layout'
import { GoalNodeCard, type GoalFlowNodeData } from './nodes/GoalNodeCard'
import { StatusEdge, type StatusEdgeData } from './edges/StatusEdge'
import { AddChildPanel } from './AddChildPanel'
import type { Status } from '../types'

const nodeTypes = { goalNode: GoalNodeCard }
const edgeTypes = { statusEdge: StatusEdge }

const STATUS_CYCLE: Status[] = ['todo', 'in-progress', 'done', 'blocked']

export function GoalTree() {
  const nodes = useGoalTreeStore((s) => s.nodes)
  const addChild = useGoalTreeStore((s) => s.addChild)
  const setStatus = useGoalTreeStore((s) => s.setStatus)
  const [addingParentId, setAddingParentId] = useState<string | null>(null)
  const { fitView } = useReactFlow()

  const { flowNodes, flowEdges } = useMemo(() => {
    const { laidOutNodes, edges } = layoutTree(nodes)

    const flowNodes: Node<GoalFlowNodeData>[] = laidOutNodes.map((n) => ({
      id: n.id,
      type: 'goalNode',
      position: { x: n.x - n.width / 2, y: n.y },
      style: { pointerEvents: 'auto' },
      data: {
        node: n,
        onAddChild: (parentId: string) => setAddingParentId(parentId),
        onCycleStatus: (id: string) => {
          const current = nodes.find((node) => node.id === id)
          if (!current) return
          const idx = STATUS_CYCLE.indexOf(current.status)
          setStatus(id, STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length])
        },
      },
      draggable: false,
      connectable: false,
    }))

    const flowEdges: Edge<StatusEdgeData>[] = edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'statusEdge',
      data: { drivingStatus: e.drivingStatus },
    }))

    return { flowNodes, flowEdges }
  }, [nodes, setStatus])

  const addingParent = addingParentId ? nodes.find((n) => n.id === addingParentId) : null

  useEffect(() => {
    const raf = requestAnimationFrame(() => fitView({ padding: 0.15, duration: 300 }))
    return () => cancelAnimationFrame(raf)
  }, [nodes.length, fitView])

  return (
    <div className="relative" style={{ height: 720, width: '100%' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        panOnScroll
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      />

      {addingParent && (
        <AddChildPanel
          parentTitle={addingParent.title}
          onConfirm={(title) => {
            addChild(addingParent.id, title)
            setAddingParentId(null)
          }}
          onCancel={() => setAddingParentId(null)}
        />
      )}
    </div>
  )
}
