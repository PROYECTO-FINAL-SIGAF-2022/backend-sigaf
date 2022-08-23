import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const UnidadesMedidasModelo = connection.define(
  "unidades_medida",
  {
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_unidad_medida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
