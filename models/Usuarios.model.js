import { DataTypes } from 'sequelize';
import { connection } from '../config/connection.js';
export const UsuariosModelo = connection.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_persona: {
    type: DataTypes.STRING,
  },
  apellido_persona: {
    type: DataTypes.STRING,
  },
  dni_persona: {
    type: DataTypes.STRING,
    unique: true,
  },
  fecha_nac_persona: {
    type: DataTypes.STRING,
  },
  telefono_persona: {
    type: DataTypes.STRING,
  },
  username_usuario: {
    type: DataTypes.STRING,
    unique: true,
  },
  password_usuario: {
    type: DataTypes.STRING,
  },
  id_tipo_usuario: {
    type: DataTypes.INTEGER,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
