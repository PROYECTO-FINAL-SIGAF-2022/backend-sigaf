import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const CosechasModelo = connection.define(
  "cosechas",
  {
    id_cosecha: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cantidad_total_cosechada: {
      type: DataTypes.STRING,
    },

    cantidad_total_vendida: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    precio_total: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fecha_venta: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
