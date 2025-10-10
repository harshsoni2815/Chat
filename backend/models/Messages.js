import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Conversation from "./Converstation.js";
 // match model name

const Message = sequelize.define("Message", {
  message_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  conversation_id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Conversation,  // use model variable
      key: "conversation_id", // match exact column name
    },
    onDelete: "CASCADE",
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Associations
Message.belongsTo(Conversation, { foreignKey: "conversation_id", onDelete: "CASCADE" });
Conversation.hasMany(Message, { foreignKey: "conversation_id" });

Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
User.hasMany(Message, { foreignKey: "sender_id", as: "sentMessages" });

export default Message;
