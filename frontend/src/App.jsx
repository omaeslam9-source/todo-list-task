import { useEffect, useState } from 'react'
import { Check, Plus,  } from 'lucide-react'
import './App.css'
import Item from './components/Item'



function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('green-todo-tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('green-todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (event) => {
    event.preventDefault()

    const text = input.trim()

    if (!text) return

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ])

    setInput('')
  }

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    )
  }

  const moveTask = (id, direction) => {
    setTasks((current) => {
      const index = current.findIndex((task) => task.id === id)

      if (index === -1) return current

      const newTasks = [...current]

      const swapIndex =
        direction === 'up'
          ? index - 1
          : index + 1

      if (
        swapIndex < 0 ||
        swapIndex >= newTasks.length
      ) {
        return current
      }

      ;[newTasks[index], newTasks[swapIndex]] = [
        newTasks[swapIndex],
        newTasks[index],
      ]

      return newTasks
    })
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Check size={19} strokeWidth={3} />
          </div>

          <span>TODO</span>
        </div>
      </header>

      <main className="page">
        <form
          className="add-form"
          onSubmit={addTask}
        >
          <input
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Add a new task..."
            aria-label="New task"
          />

          <button
            className="add-button"
            type="submit"
            aria-label="Add task"
          >
            <Plus
              size={25}
              strokeWidth={3}
            />
          </button>
        </form>

        <section
          className="task-list"
          aria-label="Task list"
        >
        {tasks.map((task, index) => (
          <Item
            key={task.id}
            task={task}
            index={index}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            Item />
))}

          {tasks.length === 0 && (
            <div className="empty-state">
              No tasks yet. Add one above.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App