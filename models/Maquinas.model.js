import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const MaquinasModelo = connection.define(
  "maquinas",
  {
    id_maquina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_maquina: {
      type: DataTypes.STRING,
    },

    tipo_adquisicion_maquina: {
      type: Sequelize.ENUM("alquiler", "compra"),
    },
    precio_adquisicion_maquina: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_adquisicion_maquina: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },

    precio_venta_maquina: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fecha_venta_maquina: {
      type: DataTypes.STRING,
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
