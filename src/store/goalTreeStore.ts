import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GoalNode, Status } from '../types'
import { seedNodes } from './seed'

let counter = 0
function nextId(prefix: string) {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}-${counter}`
}

interface GoalTreeState {
  nodes: GoalNode[]
  addChild: (parentId: string, title: string) => void
  setStatus: (id: string, status: Status) => void
  removeNode: (id: string) => void
  reset: () => void
}

export const useGoalTreeStore = create<GoalTreeState>()(
  persist(
    (set, get) => ({
      nodes: seedNodes,

      addChild: (parentId, title) => {
        const trimmed = title.trim()
        if (!trimmed) return
        const parent = get().nodes.find((n) => n.id === parentId)
        if (!parent) return
        const kind = parent.kind === 'root' ? 'branch' : 'leaf'
        const child: GoalNode = {
          id: nextId(kind),
          parentId,
          kind,
          title: trimmed,
          status: 'todo',
        }
        set({ nodes: [...get().nodes, child] })
      },

      setStatus: (id, status) => {
        set({
          nodes: get().nodes.map((n) => (n.id === id ? { ...n, status } : n)),
        })
      },

      removeNode: (id) => {
        const toRemove = new Set([id])
        let changed = true
        while (changed) {
          changed = false
          for (const n of get().nodes) {
            if (n.parentId && toRemove.has(n.parentId) && !toRemove.has(n.id)) {
              toRemove.add(n.id)
              changed = true
            }
          }
        }
        set({ nodes: get().nodes.filter((n) => !toRemove.has(n.id)) })
      },

      reset: () => set({ nodes: seedNodes }),
    }),
    { name: 'goal-tree-store' },
  ),
)
