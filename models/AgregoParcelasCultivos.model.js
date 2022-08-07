import { DataTypes } from 'sequelize';
import connection from '../config/connection.js';

const AgregoParcelaCultivo = connection.define(
  'agrego_parcela_cultivo',
  {
    id_agrego_parcela_cultivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_parcela_cultivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_agregada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// falta agregar las relaciones con la tabla parcela_cultivo
