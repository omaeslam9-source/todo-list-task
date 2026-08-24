import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import './styles.css';

const initialTasks = [
  { id: 1, text: 'Make a todo app', completed: true },
  { id: 2, text: 'Task 2: create a new UI', completed: false },
  { id: 3, text: 'Review the project structure', completed: false },
  { id: 4, text: 'Test the application', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('green-todo-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('green-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const moveTask = (id, direction) => {
    setTasks((current) => {
      const idx = current.findIndex((t) => t.id === id);
      if (idx === -1) return current;
      const newTasks = [...current];
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= newTasks.length) return current;
      [newTasks[idx], newTasks[swapIdx]] = [newTasks[swapIdx], newTasks[idx]];
      return newTasks;
    });
  };

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
        <form className="add-form" onSubmit={addTask}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <button className="add-button" type="submit" aria-label="Add task">
            <Plus size={25} strokeWidth={3} />
          </button>
        </form>

        <section className="task-list" aria-label="Task list">
          {tasks.map((task, index) => (
            <article
              className={`task-card ${task.completed ? 'completed' : ''}`}
              key={task.id}
            >
              <button
                className="check-button"
                onClick={() => toggleTask(task.id)}
                aria-label={task.completed ? 'Mark as active' : 'Mark as completed'}
              >
                {task.completed && <Check size={16} strokeWidth={3} />}
              </button>

              <span className="task-index">{index + 1}.</span>
              <span className="task-text">{task.text}</span>

              <div className="move-buttons">
                <button
                  className="move-button"
                  onClick={() => moveTask(task.id, 'up')}
                  aria-label="Move up"
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>

                <button
                  className="move-button"
                  onClick={() => moveTask(task.id, 'down')}
                  aria-label="Move down"
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </article>
          ))}

          {tasks.length === 0 && (
            <div className="empty-state">No tasks yet. Add one above.</div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);