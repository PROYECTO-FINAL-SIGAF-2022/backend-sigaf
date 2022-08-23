import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const DetalleCampanias = connection.define(
  "detalle_campania",
  {
    id_detalle_campania: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_campania: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_cosechada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
