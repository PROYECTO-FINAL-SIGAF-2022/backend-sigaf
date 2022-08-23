import { DataTypes } from 'sequelize';
import { connection } from '../config/connection.js';

export const ProveedoresModelo = connection.define(
  'proveedores',
  {
    id_proveedor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono_proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion_proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
