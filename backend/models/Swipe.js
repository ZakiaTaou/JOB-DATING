import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Swipe = sequelize.define(
  "Swipe",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetType: {
      type: DataTypes.ENUM("candidate", "job_offer"),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
  },
  {
    tableName: "swipes",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "targetId", "targetType"],
      },
    ],
  }
);
export default Swipe;