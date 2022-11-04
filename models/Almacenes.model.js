import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const AlmacenesModelo = connection.define(
  "almacenes",
  {
    id_almacen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_almacen: {
      type: DataTypes.STRING,
    },

    tipo_adquisicion: {
      type: Sequelize.ENUM("alquiler", "compra"),
    },

    precio_adquisicion: {
      type: DataTypes.STRING,
    },

    fecha_adquisicion: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },

    precio_venta: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: true,
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
