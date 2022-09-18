import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const PerdidasParcelasCultivosModelo = connection.define(
  "perdida_parcela_cultivo",
  {
    id_perdida_parcela_cultivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_parcela_cultivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_perdida: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
