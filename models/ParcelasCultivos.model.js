import { DataTypes } from 'sequelize';
import { connection } from '../config/connection.js';

export const ParcelasCultivosModelo = connection.define(
  'parcelas_cultivos',
  {
    id_parcelas_cultivos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_parcela: {
      type: DataTypes.INTEGER,
    },
    id_cultivo: {
      type: DataTypes.INTEGER,
    },
    id_campania: {
      type: DataTypes.INTEGER,
    },
    cantidad_sembrada: {
      type: DataTypes.INTEGER,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
