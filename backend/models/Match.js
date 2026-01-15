import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Match = sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "candidates",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    jobOfferId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "job_offers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("active", "archived", "rejected"),
      allowNull: false,
      defaultValue: "active",
    },
    matchedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "matches",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["candidateId", "jobOfferId"],
      },
    ],
  }
);
export default Match