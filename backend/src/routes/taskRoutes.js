import express from "express";

import {
  getTasks,
  addTask,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController.js";

const router = express.Router();

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", addTask);

// PUT /tasks/:id
router.put("/:id", updateTaskById);

// DELETE /tasks/:id
router.delete("/:id", deleteTaskById);

export default router;