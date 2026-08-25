import {
  Check,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'

function Item({
  task,
  index,
  toggleTask,
  deleteTask,
  moveTask,
}) {
  return (
    <article
      className={`task-card ${
        task.completed ? 'completed' : ''
      }`}
    >
      <button
        className="check-button"
        onClick={() => toggleTask(task.id)}
      >
        {task.completed && (
          <Check size={16} strokeWidth={3} />
        )}
      </button>

      <span className="task-index">
        {index + 1}.
      </span>

      <span className="task-text">
        {task.text}
      </span>

      <div className="move-buttons">
        <button
          className="move-button"
          onClick={() => moveTask(task.id, 'up')}
        >
          <ChevronUp size={14} />
        </button>

        <button
          className="move-button"
          onClick={() => moveTask(task.id, 'down')}
        >
          <ChevronDown size={14} />
        </button>
      </div>

      <button
        className="delete-button"
        onClick={() => deleteTask(task.id)}
      >
        <Trash2 size={16} />
      </button>
    </article>
  )
}

export default Item


