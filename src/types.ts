export type Status = 'done' | 'in-progress' | 'blocked' | 'todo'

export type NodeKind = 'root' | 'branch' | 'leaf'

export interface GoalNode {
  id: string
  parentId: string | null
  kind: NodeKind
  title: string
  status: Status
  note?: string
}
