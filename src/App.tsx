import { ReactFlowProvider } from '@xyflow/react'
import { Legend } from './components/Legend'
import { GoalTree } from './components/GoalTree'

function App() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-16">
      <h1 className="mb-4 text-[34px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>
        Goal Tree
      </h1>
      <p className="mb-10 max-w-[58ch]" style={{ color: 'var(--text-muted)', fontSize: 16 }}>
        One goal, broken into the sub-goals and tasks that push toward it. This example:{' '}
        <b style={{ color: 'var(--text)', fontWeight: 600 }}>launching a founder podcast</b>, from pilot episode to
        first guests to going live.
      </p>

      <Legend />

      <ReactFlowProvider>
        <GoalTree />
      </ReactFlowProvider>

      <p className="mt-4 max-w-[60ch]" style={{ color: 'var(--text-dim)', fontSize: 13 }}>
        The orange line traces the branch currently being worked, from the goal down to the task in progress. Click a
        title to cycle its status, or use the + button to add a child.
      </p>
    </div>
  )
}

export default App
