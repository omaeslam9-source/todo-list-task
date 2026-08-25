import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize("todoo_app", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
});

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
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

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["orders", "ASC"], ["id", "ASC"]],
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tasks" });
  }
});

// Add a task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title ) {
      return res.status(400).json({ error: "title and user_ are required" });
    }
    const task = await Task.create({ title, completed: false });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL connected successfully");
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error);
  });
  