import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const ParcelasModelo = connection.define(
  "parcelas",
  {
    id_parcela: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    georeferencia: {
      type: DataTypes.TEXT,
    },
    superficie: {
      type: DataTypes.STRING,
    },
    id_establecimiento: {
      type: DataTypes.INTEGER,
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
