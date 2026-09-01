import express from "express";
import cors from "cors";

import sequelize from "./config/database.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

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