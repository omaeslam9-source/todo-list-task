import { useState } from "react";
import { Plus } from "lucide-react";

function AddTask({ setTasks }) {
  const [input, setInput] = useState("");

  const addTask = async (event) => {
    event.preventDefault();

    const title = input.trim();

    if (!title) return;

    try {
      const response = await fetch(
        "http://localhost:3000/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: title,
            description: "",
          }),
        }
      );

      const newTask = await response.json();

      if (!response.ok) {
        console.error(newTask);
        return;
      }

      setTasks((current) => [
        ...current,
        newTask,
      ]);

      setInput("");
    } catch (error) {
      console.error(
        "Error adding task:",
        error
      );
    }
  };

  return (
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
  );
}

export default AddTask;