import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const JobOffer = sequelize.define(
  "JobOffer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recruiterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recruiters",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requiredSkills: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    contractType: {
      type: DataTypes.ENUM("CDI", "CDD", "Freelance", "Stage", "Alternance"),
      allowNull: false,
      defaultValue: "CDI",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary: {
      type: DataTypes.JSON,
      allowNull: true,
      // Format: {min: number, max: number, currency: string}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "job_offers",
    timestamps: true,
  }
);
export default JobOffer;