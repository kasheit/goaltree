import type { GoalNode } from '../types'

export const seedNodes: GoalNode[] = [
  { id: 'root', parentId: null, kind: 'root', title: 'Launch founder podcast', status: 'in-progress', note: '5 of 9 tasks done' },

  { id: 'b-pilot', parentId: 'root', kind: 'branch', title: 'Produce pilot episode', status: 'in-progress' },
  { id: 'b-guests', parentId: 'root', kind: 'branch', title: 'Line up guest schedule', status: 'done' },
  { id: 'b-distribution', parentId: 'root', kind: 'branch', title: 'Build distribution', status: 'blocked', note: 'Blocked on pilot' },
  { id: 'b-rig', parentId: 'root', kind: 'branch', title: 'Set up recording rig', status: 'done' },

  { id: 'l-outline', parentId: 'b-pilot', kind: 'leaf', title: 'Write ep. 01 outline', status: 'done' },
  { id: 'l-record', parentId: 'b-pilot', kind: 'leaf', title: 'Record & edit audio', status: 'in-progress' },
  { id: 'l-cover', parentId: 'b-pilot', kind: 'leaf', title: 'Design cover art', status: 'todo' },

  { id: 'l-shortlist', parentId: 'b-guests', kind: 'leaf', title: 'Shortlist 10 guests', status: 'done' },
  { id: 'l-confirm', parentId: 'b-guests', kind: 'leaf', title: 'Confirm first 3 dates', status: 'done' },

  { id: 'l-apps', parentId: 'b-distribution', kind: 'leaf', title: 'List on podcast apps', status: 'todo' },
  { id: 'l-rss', parentId: 'b-distribution', kind: 'leaf', title: 'Set up RSS feed', status: 'todo' },

  { id: 'l-mics', parentId: 'b-rig', kind: 'leaf', title: 'Buy mics & interface', status: 'done' },
  { id: 'l-room', parentId: 'b-rig', kind: 'leaf', title: 'Treat the room', status: 'done' },
]
