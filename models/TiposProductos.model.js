import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const TiposProductos = connection.define(
  'tipos_productos',
  {
    id_tipo_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_tipo_producto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// falta agregar la relacion con la tabla producto
