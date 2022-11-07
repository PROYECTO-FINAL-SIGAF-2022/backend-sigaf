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
    descripcion_parcela: {
      type: DataTypes.STRING,
      defaultValue: "Sin descripción",
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
