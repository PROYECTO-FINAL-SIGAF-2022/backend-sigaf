import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const CosechasModelo = connection.define(
  "ventas_cosechas",
  {
    id_cosecha: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    // cantidad_total_cosechada: {
    //   type: DataTypes.STRING,
    // },

    cantidad_total_vendida: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    precio_venta: {
      type: DataTypes.STRING,
      allowNull: false,
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
