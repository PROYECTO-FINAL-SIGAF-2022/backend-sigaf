import { DataTypes, Sequelize } from "sequelize";
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
    precio_total_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_compra: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
