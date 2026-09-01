import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService.js";

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get tasks",
    });
  }
};

// POST /tasks
export const addTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "title is required",
      });
    }

    const task = await createTask(title);

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create task",
    });
  }
};

// PUT /tasks/:id
export const updateTaskById = async (req, res) => {
  try {
    const task = await updateTask(
      req.params.id,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
};

// DELETE /tasks/:id
export const deleteTaskById = async (req, res) => {
  try {
    const task = await deleteTask(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete task",
    });
  }
};