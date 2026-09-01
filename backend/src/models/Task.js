import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

export default Task;