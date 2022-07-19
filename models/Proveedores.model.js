import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const Proveedores = connection.define(
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
      type: DataTypes.INTEGER,
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

// falta agregar las relaciones con la tabla productos
