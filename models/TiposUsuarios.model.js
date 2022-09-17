import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const TiposUsuariosModelo = connection.define(
  "tipo_usuarios",
  {
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_tipo_usuario: {
      type: DataTypes.STRING,
    },
    rutas_usuario: {
      type: DataTypes.JSON,
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
