import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const CultivosModelo = connection.define(
  "cultivos",
  {
    id_cultivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cultivo: {
      type: DataTypes.STRING,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  },
);
