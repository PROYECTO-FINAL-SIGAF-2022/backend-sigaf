import { DataTypes } from "sequelize";
import { connection } from "../config/connection.js";

export const ParcelasCultivosModelo = connection.define(
  "parcelas_cultivos",
  {
    id_parcela_cultivo: {
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
    id_unidad_medida: {
      type: DataTypes.INTEGER,
    },
    cantidad_sembrada: {
      type: DataTypes.INTEGER,
    },

    cantidad_total_cosechada: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  },
);
