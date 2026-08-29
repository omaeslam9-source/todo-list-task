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
        aria-label={
          task.completed
            ? 'Mark as active'
            : 'Mark as completed'
        }
      >
        {task.completed && (
          <Check size={16} strokeWidth={3} />
        )}
      </button>

      <span className="task-index">
        {index + 1}.
      </span>

      <span className="task-text">
        {task.title}
      </span>

      <div className="move-buttons">
        <button
          className="move-button"
          onClick={() =>
            moveTask(task.id, 'up')
          }
          aria-label="Move up"
          title="Move up"
        >
          <ChevronUp size={14} />
        </button>

        <button
          className="move-button"
          onClick={() =>
            moveTask(task.id, 'down')
          }
          aria-label="Move down"
          title="Move down"
        >
          <ChevronDown size={14} />
        </button>
      </div>

      <button
        className="delete-button"
        onClick={() =>
          deleteTask(task.id)
        }
        aria-label="Delete task"
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </article>
  )
}

export default Item