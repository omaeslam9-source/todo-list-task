import { Plus } from 'lucide-react'

function Tasks({ input, setInput, addTask }) {
  return (
    <form className="add-form" onSubmit={addTask}>
      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Add a new task..."
        aria-label="New task"
      />

      <button
        className="add-button"
        type="submit"
        aria-label="Add task"
      >
        <Plus size={25} strokeWidth={3} />
      </button>
    </form>
  )
}

export default Tasks