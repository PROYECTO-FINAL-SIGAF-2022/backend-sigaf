import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const MaquinasParcelasCultivosModelo = connection.define(
  "maquinas_parcelas_cultivos",
  {
    id_maquina_parcela_cultivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_alta: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
