import Sequelize from "sequelize";
import { sequelize } from "..";

const Plan = sequelize.define("plan", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  }
});
