import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const Productos = connection.define(
  'productos',
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
  },
  {
    timestamps: false,
  }
);

// falta agregar las relaciones con el id_proveedor, id_tipo_producto, id_usuario, id_unidad_medida
