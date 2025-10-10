import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Conversation = sequelize.define(
  "Conversation", // fixed model name
  {
    conversation_id: { // lowercase
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    user_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["user_1", "user_2"],
      },
    ],
  }
);

export default Conversation;
