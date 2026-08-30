import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  "todoo_app",
  "root",
  "2005",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    orders: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "task",
    timestamps: false,
  }
);

// Check API
app.get("/", (req, res) => {
  res.json({
    message: "TODO API is running",
  });
});

// GET all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ["orders", "ASC"],
        ["id", "ASC"],
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get tasks",
    });
  }
});

// POST new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const lastTask = await Task.findOne({
      order: [["orders", "DESC"]],
    });

    const nextOrder = lastTask
      ? (lastTask.orders || 0) + 1
      : 1;

    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      completed: false,
      orders: nextOrder,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create task",
    });
  }
});

// PUT update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const { title, description, completed, orders } = req.body;

    const updates = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          error: "Title cannot be empty",
        });
      }

      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = description;
    }

    if (completed !== undefined) {
      updates.completed = completed;
    }

    if (orders !== undefined) {
      updates.orders = orders;
    }

    await task.update(updates);

    res.json(task);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    await task.destroy();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete task",
    });
  }
});

// Connect to MySQL and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connected successfully");

    app.listen(3000, () => {
      console.log(
        "Server running on http://localhost:3000"
      );
    });
  })
  .catch((error) => {
    console.error(
      "MySQL connection failed:",
      error
    );
  });