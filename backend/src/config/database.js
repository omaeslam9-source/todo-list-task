import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todoo_app", "root", "123456789", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;