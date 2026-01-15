import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Candidate = sequelize.define(
  "Candidate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    experience: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      // Format: [{title, company, startDate, endDate, description}]
    },
    education: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      // Format: [{degree, school, year}]
    },
    cvUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.ENUM("immediate", "1-months", "2-months", "3-months"),
      allowNull: true,
    },
  },
  {
    tableName: "candidates",
    timestamps: true,
  }
);
export default Candidate;
