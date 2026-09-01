import Task from "../models/Task.js";

// Get all tasks
export const getAllTasks = async () => {
  return await Task.findAll({
    order: [
      ["orders", "ASC"],
      ["id", "ASC"],
    ],
  });
};

// Create task
export const createTask = async (title) => {
  return await Task.create({
    title,
    completed: false,
  });
};

// Update task
export const updateTask = async (id, data) => {
  const task = await Task.findByPk(id);

  if (!task) {
    return null;
  }

  await task.update(data);

  return task;
};

// Delete task
export const deleteTask = async (id) => {
  const task = await Task.findByPk(id);

  if (!task) {
    return null;
  }

  await task.destroy();

  return task;
};