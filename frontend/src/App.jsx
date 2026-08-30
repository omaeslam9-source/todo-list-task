import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import './App.css'
import Item from './components/Item'
import AddTask from './components/AddTask'
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([])

  // Get tasks from Backend
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error)
      })
  }, [])

 const toggleTask = async (id) => {
  const task = tasks.find((task) => task.id === id)

  if (!task) return

  const updatedCompleted = !task.completed

  try {
    const response = await fetch(
      `http://localhost:3000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: updatedCompleted,
        }),
      }
    )

    const updatedTask = await response.json()

    if (!response.ok) {
      console.error(updatedTask)
      return
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === id ? updatedTask : task
      )
    )
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const deleteTask = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/tasks/${id}`,
      {
        method: 'DELETE',
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error(data)
      return
    }

    setTasks((current) =>
      current.filter((task) => task.id !== id)
    )
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

 const moveTask = async (id, direction) => {
  const index = tasks.findIndex(
    (task) => task.id === id
  )

  if (index === -1) return

  const swapIndex =
    direction === 'up'
      ? index - 1
      : index + 1

  if (
    swapIndex < 0 ||
    swapIndex >= tasks.length
  ) {
    return
  }

  const newTasks = [...tasks]

  ;[newTasks[index], newTasks[swapIndex]] = [
    newTasks[swapIndex],
    newTasks[index],
  ]

  // Update order numbers
  const updatedTasks = newTasks.map(
    (task, index) => ({
      ...task,
      orders: index + 1,
    })
  )

  setTasks(updatedTasks)

  try {
    await Promise.all(
      updatedTasks.map((task) =>
        fetch(
          `http://localhost:3000/tasks/${task.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orders: task.orders,
            }),
          }
        )
      )
    )
  } catch (error) {
    console.error(
      'Error updating task order:',
      error
    )
  }
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

        <AddTask setTasks={setTasks} />

<TaskList
  tasks={tasks}
  toggleTask={toggleTask}
  deleteTask={deleteTask}
  moveTask={moveTask}
/>

      </main>
    </div>
  )
}

export default App
    