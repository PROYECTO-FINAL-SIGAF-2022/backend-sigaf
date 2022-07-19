import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const UnidadesMedida = connection.define(
  'unidades_medida',
  {
    id_unidad_medida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_unidad_medida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// falta agregar la relacion con la tabla productos y detalle_campania
