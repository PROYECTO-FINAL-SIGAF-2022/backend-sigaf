import sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import { connection } from '../config/connection.js';

export const LogSistema = connection.define(
  'log_sistema',
  {
    id_log_sistema: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_hora: {
      allowNull: false,
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    descripcion_log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
