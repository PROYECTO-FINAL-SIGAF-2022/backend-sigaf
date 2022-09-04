import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";
// Falta completar

export const ProductosModelo = connection.define(
  "productos",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_vencimiento_producto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidad_producto: {
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
