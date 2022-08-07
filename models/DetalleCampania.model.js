import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const DetalleCompania = connection.define(
  'detalle_compania',
  {
    id_detalle_compania: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_campania: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_cosechada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// falta agregar las relaciones con la tabla campania, unidad_medida
