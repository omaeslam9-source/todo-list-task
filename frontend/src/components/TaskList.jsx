import Item from './Item'

function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  moveTask,
}) {
  return (
    <section className="task-list">
      {tasks.map((task, index) => (
        <Item
          key={task.id}
          task={task}
          index={index}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}

      {tasks.length === 0 && (
        <div className="empty-state">
          No tasks yet. Add one above.
        </div>
      )}
    </section>
  )
}

export default TaskList