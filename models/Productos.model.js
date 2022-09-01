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
    id_proveedor: {
      type: DataTypes.INTEGER,
      
    },
    id_tipo_producto: {
      type: DataTypes.INTEGER,
      
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      
    },
  },
  {
    timestamps: false,
  },
);
